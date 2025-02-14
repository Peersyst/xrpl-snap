import { Button, Typography, Modal, TextField, Col, Row } from '@peersyst/react-components';
import { useCallback, useEffect, useState } from 'react';
import { useStore } from 'zustand';

import useWalletState from '../../../domain/wallet/state/walletState';
import ControllerFactory from '../../adapter/ControllerFactory';
import Card from '../../common/components/surface/Card/Card';
import useTranslate from '../../locale/hooks/useTranslate';
import { useInvalidateInfiniteQuery } from '../../query/hooks/useInvalidateInfiniteQuery';
import { useInvalidateQueries } from '../../query/hooks/useInvalidateQueries';
import { Queries } from '../../query/queries';
import AccountChip from './display/AccountChip';

export interface WalletInfo {
  address: string;
  publicKey: string;
  type: 'derived' | 'imported';
  isActive: boolean;
}

export function WalletManager() {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importKey, setImportKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const translate = useTranslate();
  const { address } = useStore(useWalletState);
  const invalidateQueries = useInvalidateQueries();
  const invalidateInfiniteQueries = useInvalidateInfiniteQuery();

  const connectSnap = useCallback(async () => {
    try {
      console.log('Checking snap connection status...');
      // First check if MetaMask is available
      if (!window.ethereum) {
        console.error('MetaMask is not installed');
        return false;
      }

      // Check if snap is connected
      const snaps = (await window.ethereum.request({
        method: 'wallet_getSnaps',
      })) as Record<string, { version: string }>;
      console.log('Current installed snaps:', JSON.stringify(snaps, null, 2));
      const snapId = process.env.REACT_APP_SNAP_ID || '';
      console.log('Looking for snap ID:', snapId);
      return snaps && Object.keys(snaps).includes(snapId);
    } catch (error) {
      console.error('Failed to check snap connection:', error);
      return false;
    }
  }, []);

  const loadWallets = useCallback(async () => {
    try {
      // Only check if snap is connected, don't try to connect here
      const isConnected = await connectSnap();
      if (!isConnected) {
        console.log('Snap not connected, skipping wallet load');
        return;
      }

      console.log('Using Snap ID:', process.env.REACT_APP_SNAP_ID);
      const response = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: process.env.REACT_APP_SNAP_ID,
          request: {
            method: 'xrpl_listWallets',
          },
        },
      })) as { wallets: WalletInfo[] };
      if (response?.wallets) {
        setWallets(response.wallets);
      }
    } catch (error) {
      console.error('Failed to load wallets:', error);
      console.error('Current Snap ID:', process.env.REACT_APP_SNAP_ID);
    }
  }, [connectSnap]);

  useEffect(() => {
    // Only check if snap is connected, don't auto-connect
    connectSnap()
      .then(async (isConnected) => {
        if (isConnected) {
          // If already connected, load wallets
          await loadWallets();
          await ControllerFactory.walletController.loadWallet();
        }
        // Don't automatically request connection if not connected
      })
      .catch(console.error);
  }, [connectSnap, loadWallets]);

  const handleImportWallet = async () => {
    setIsLoading(true);
    try {
      console.log('Starting wallet import process...');
      // Format the seed - ensure 's' prefix
      let formattedSeed = importKey;
      if (!formattedSeed.startsWith('s')) {
        formattedSeed = `s${formattedSeed}`;
      }

      console.log('Using snap ID:', process.env.REACT_APP_SNAP_ID);
      const result = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: process.env.REACT_APP_SNAP_ID,
          request: {
            method: 'xrpl_importWallet',
            params: {
              seed: formattedSeed,
            },
          },
        },
      });
      console.log('Import wallet response:', JSON.stringify(result, null, 2));
      console.log('Loading updated wallet list...');
      await loadWallets();
      setImportKey('');
      setIsImportDialogOpen(false);
      if (typeof address === 'string') {
        await handleSwitchWallet(address);
      }
      console.log('Wallet import process completed successfully');
    } catch (error) {
      console.error('Failed to import wallet. Error details:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      // Re-throw the error if it's a user rejection or invalid key
      if (error instanceof Error) {
        if (error.message.includes('User rejected') || error.message.includes('Invalid')) {
          throw error;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchWallet = useCallback(
    async (address: string): Promise<void> => {
      try {
        console.log('Switching wallet to:', address);

        // Switch the wallet first using the snap
        await window.ethereum.request({
          method: 'wallet_invokeSnap',
          params: {
            snapId: process.env.REACT_APP_SNAP_ID,
            request: {
              method: 'xrpl_switchWallet',
              params: { address },
            },
          },
        });

        // Get the current wallet to verify the switch was successful
        const currentWallet = (await window.ethereum.request({
          method: 'wallet_invokeSnap',
          params: {
            snapId: process.env.REACT_APP_SNAP_ID,
            request: {
              method: 'xrpl_getAccount',
            },
          },
        })) as { account: string };

        console.log('Current wallet after switch:', currentWallet);

        // For derived wallet, we just need to verify we got a valid response
        // For imported wallets, we need to verify the address matches
        const isDerivedWallet = wallets.find((w) => w.address === address)?.type === 'derived';
        if (!currentWallet || (!isDerivedWallet && currentWallet.account !== address)) {
          throw new Error('Failed to switch wallet');
        }

        // Update the wallet state using the controller
        await ControllerFactory.walletController.loadWallet();

        // Wait a moment for the state to propagate
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Invalidate all relevant queries to refresh data for the new wallet
        await Promise.all([
          invalidateQueries({ queryKey: [Queries.GET_BALANCE] }),
          invalidateQueries({ queryKey: [Queries.GET_TOKENS] }),
          invalidateQueries({ queryKey: [Queries.GET_NFTS] }),
          invalidateInfiniteQueries([Queries.GET_TRANSACTIONS]),
        ]);

        // Load wallets one final time to ensure UI is in sync
        await loadWallets();

        console.log('Successfully switched wallet to:', address);
      } catch (error) {
        console.error('Error switching wallet:', error);
        throw error;
      }
    },
    [invalidateQueries, invalidateInfiniteQueries, loadWallets, wallets],
  );

  const handleButtonClick = (address: string) => {
    handleSwitchWallet(address).catch(console.error);
  };

  const handleImportButtonClick = () => {
    handleImportWallet().catch(console.error);
  };

  const handleTextFieldChange = (value: string) => {
    setImportKey(value);
  };

  return (
    <>
      <Card css={{ width: '100%' }}>
        <Col gap="1rem">
          <Row justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{translate('manageWallets')}</Typography>
            <Button
              onClick={() => setIsImportDialogOpen(true)}
              variant="primary"
              size="sm"
              loading={isLoading}
              css={{
                textTransform: 'capitalize',
                borderRadius: '3em',
                transition: 'all 0.3s',
                backgroundColor: '#1A1A1A',
                color: 'white',
                padding: '0.25rem 1rem',
                fontSize: '0.875rem',
                height: '2rem',
                minWidth: '0',
                '&:hover': {
                  filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(1px)',
                },
              }}
            >
              {translate('importWallet')}
            </Button>
          </Row>
          <div css={{ width: '100%' }}>
            <table css={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 1rem' }}>
              <tbody>
                {wallets.map((wallet, index) => (
                  <tr
                    key={`${wallet.type}-${wallet.address}-${index}`}
                    css={{
                      backgroundColor: wallet.isActive ? 'var(--success-light)' : 'transparent',
                      borderRadius: '8px',
                    }}
                  >
                    <td css={{ padding: '0.5rem', width: '50%' }}>
                      <AccountChip address={wallet.address} />
                    </td>
                    <td css={{ padding: '0.5rem', width: '25%' }}>
                      <Typography variant="body2" color="grey.400">
                        {translate(`walletType.${wallet.type}`)}
                      </Typography>
                    </td>
                    <td css={{ padding: '0.5rem', width: '25%', textAlign: 'right' }}>
                      {wallet.isActive ? (
                        <div
                          css={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.25rem 1rem',
                            height: '2rem',
                            borderRadius: '3em',
                            backgroundColor: 'var(--success-light)',
                            border: '1px solid var(--success)',
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="green"
                            css={{
                              fontSize: '0.875rem',
                              fontWeight: '700',
                              lineHeight: '1',
                            }}
                          >
                            {translate('active')}
                          </Typography>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleButtonClick(wallet.address)}
                          variant="primary"
                          size="sm"
                          css={{
                            padding: '0.25rem 1rem',
                            textTransform: 'capitalize',
                            borderRadius: '3em',
                            transition: 'all 0.3s',
                            backgroundColor: '#1A1A1A',
                            color: 'white',
                            height: '2rem',
                            fontSize: '0.875rem',
                            minWidth: '0',
                            '&:hover': {
                              filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
                              transform: 'translateY(-1px)',
                            },
                            '&:active': {
                              transform: 'translateY(1px)',
                            },
                          }}
                          loading={isLoading}
                        >
                          {translate('switchWallet')}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Card>

      <Modal open={isImportDialogOpen} onClose={() => setIsImportDialogOpen(false)}>
        <Col gap="1rem">
          <Typography variant="h6">{translate('importXrplWallet')}</Typography>
          <TextField
            label={translate('familySeed')}
            value={importKey}
            onChange={handleTextFieldChange}
            type="password"
            placeholder="sXXXXXXXXXXXXXXXXXXXXXXXXXXX..."
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <Button onClick={() => setIsImportDialogOpen(false)} variant="secondary" disabled={isLoading}>
              {translate('cancel')}
            </Button>
            <Button onClick={handleImportButtonClick} variant="primary" loading={isLoading} disabled={!importKey.trim()}>
              {translate('confirm')}
            </Button>
          </div>
        </Col>
      </Modal>
    </>
  );
}
