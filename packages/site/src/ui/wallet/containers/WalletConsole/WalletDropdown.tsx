import { Col, Row, Typography, Button, Modal, TextField } from '@peersyst/react-components';
import clsx from 'clsx';
import useWalletState from 'domain/wallet/state/walletState';
import { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import { ChevronDownIcon } from 'ui/common/icons';
import { useTranslate } from 'ui/locale';
import { useInvalidateInfiniteQuery } from 'ui/query/hooks/useInvalidateInfiniteQuery';
import { useInvalidateQueries } from 'ui/query/hooks/useInvalidateQueries';
import { Queries } from 'ui/query/queries';
import { useStore } from 'zustand';

import AccountChip from '../../components/display/AccountChip';

const ImportButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.palette.primary};
  color: ${({ theme }) => theme.palette.primary};
  background-color: transparent;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  width: 100%;
  text-transform: uppercase;

  &:hover {
    background-color: ${({ theme }) => `${theme.palette.primary}10`};
    transform: translateY(-1px);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const StyledModal = styled(Modal)`
  --modal-padding: 1.5rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: var(--modal-padding);
  width: 320px;
  background-color: ${({ theme }) => theme.palette.background};
  border-radius: 16px;
  z-index: 1100;
  margin: 0;
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down('mobile')} {
    width: min(320px, calc(100vw - 2rem));
    padding: 1.25rem;
  }
`;

export interface WalletInfo {
  address: string;
  publicKey: string;
  type: 'derived' | 'imported';
  isActive: boolean;
}

const DropdownContainer = styled.div(
  ({ theme }) => `
    position: relative;
    width: 100%;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${theme.palette.background};
    border: 1px solid ${theme.palette.grey[200]};
    transition: all 0.2s ease;

    &:hover {
      border-color: ${theme.palette.grey[300]};
    }
  `,
);

const DropdownHeader = styled(Row)`
  padding: 0.75rem;
  justify-content: space-between;
  align-items: center;
`;

const DropdownList = styled.div(
  ({ theme }) => `
    position: absolute;
    background-color: ${theme.palette.background};
    border: 1px solid ${theme.palette.grey[200]};
    border-radius: 8px;
    margin-top: 0.5rem;
    max-height: 200px;
    overflow-y: auto;
    z-index: 2000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `,
);

const DropdownItem = styled.div(
  ({ theme }) => `
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${theme.palette.grey[100]};
    }

    &.active {
      background-color: ${theme.palette.grey[100]};
    }
  `,
);

const ChevronIcon = styled(ChevronDownIcon)<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.2s ease;
`;

export default function WalletDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importKey, setImportKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useStore(useWalletState);
  const invalidateQueries = useInvalidateQueries();
  const invalidateInfiniteQueries = useInvalidateInfiniteQuery();
  const translate = useTranslate();
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const connectSnap = useCallback(async () => {
    try {
      console.log('Checking snap connection status...');
      if (!window.ethereum) {
        console.error('MetaMask is not installed');
        return false;
      }

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
    connectSnap()
      .then(async (isConnected) => {
        if (isConnected) {
          await loadWallets();
          await ControllerFactory.walletController.loadWallet();
        }
      })
      .catch(console.error);
  }, [connectSnap, loadWallets]);

  const handleSwitchWallet = async (walletAddress: string) => {
    try {
      console.log('Switching wallet to:', walletAddress);
      await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: process.env.REACT_APP_SNAP_ID,
          request: {
            method: 'xrpl_switchWallet',
            params: { address: walletAddress },
          },
        },
      });

      await ControllerFactory.walletController.loadWallet();

      await Promise.all([
        invalidateQueries({ queryKey: [Queries.GET_BALANCE] }),
        invalidateQueries({ queryKey: [Queries.GET_TOKENS] }),
        invalidateQueries({ queryKey: [Queries.GET_NFTS] }),
        invalidateInfiniteQueries([Queries.GET_TRANSACTIONS]),
      ]);

      await loadWallets();
      setIsOpen(false);
      console.log('Successfully switched wallet to:', walletAddress);
    } catch (error) {
      console.error('Error switching wallet:', error);
    }
  };

  const handleImportWallet = async () => {
    setIsLoading(true);
    try {
      console.log('Starting wallet import process...');
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
        // Re-throw the error if it's a user rejection or invalid key
        if (error.message.includes('User rejected') || error.message.includes('Invalid')) {
          throw error;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportButtonClick = () => {
    handleImportWallet().catch(console.error);
  };

  const activeWallet = wallets.find((w) => w.isActive);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <>
      <DropdownContainer ref={containerRef} onClick={() => setIsOpen(!isOpen)}>
        <DropdownHeader>
          <Col>
            <Typography variant="body2" color="grey.500">
              Select Active Wallet
            </Typography>
            {activeWallet && <AccountChip address={activeWallet.address} />}
          </Col>
          <ChevronIcon $isOpen={isOpen} />
        </DropdownHeader>
      </DropdownContainer>
      {isOpen &&
        createPortal(
          <DropdownList
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            }}
          >
            {wallets.map((wallet) => (
              <DropdownItem
                key={wallet.address}
                className={clsx({ active: wallet.isActive })}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!wallet.isActive) {
                    handleSwitchWallet(wallet.address);
                  }
                }}
              >
                <AccountChip address={wallet.address} />
              </DropdownItem>
            ))}
          </DropdownList>,
          document.body,
        )}
      <ImportButton
        onClick={(e) => {
          e?.stopPropagation();
          setIsImportDialogOpen(true);
        }}
      >
        {translate('importWallet')}
      </ImportButton>

      <StyledModal open={isImportDialogOpen} onClose={() => setIsImportDialogOpen(false)}>
        <Col gap="1rem">
          <Typography variant="h6">{translate('importXrplWallet')}</Typography>
          <TextField
            label={translate('familySeed')}
            value={importKey}
            onChange={(value) => setImportKey(value)}
            type="password"
            placeholder="sXXXXXXXXXXXXXXXXXXXXXXXXXXX..."
          />
          <Row justifyContent="flex-end" gap="1rem">
            <Button onClick={() => setIsImportDialogOpen(false)} variant="secondary" disabled={isLoading}>
              {translate('cancel')}
            </Button>
            <Button onClick={handleImportButtonClick} variant="primary" loading={isLoading} disabled={!importKey.trim()}>
              {translate('confirm')}
            </Button>
          </Row>
        </Col>
      </StyledModal>
    </>
  );
}
