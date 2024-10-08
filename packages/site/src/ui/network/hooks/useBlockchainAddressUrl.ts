import type { BlockchainAddressProps } from '@peersyst/react-components';
import { useComponentConfig } from '@peersyst/react-components';
import type { BlockchainAddressType } from 'common/models/network/network.types';
import { NetworkChainId } from 'common/models/network/network.types';

import useGetActiveNetwork from '../query/useGetActiveNetwork';

export function useBlockchainAddressUrl(typeParam: BlockchainAddressType, address: string) {
  const { data: network } = useGetActiveNetwork();

  const type = ((): BlockchainAddressProps['type'] => {
    switch (network?.chainId) {
      case NetworkChainId.DEVNET:
        return typeParam === 'address' ? 'devnetAddress' : 'devnetTx';
      case NetworkChainId.MAINNET:
        return typeParam === 'address' ? 'mainnetAddress' : 'mainnetTx';
      case NetworkChainId.TESTNET:
        return typeParam === 'address' ? 'testnetAddress' : 'testnetTx';
      default:
        return typeParam === 'address' ? 'mainnetAddress' : 'mainnetTx';
    }
  })();

  const { blockchainLinks } = useComponentConfig('BlockchainAddress');
  const baseUrl = blockchainLinks[type];

  return `${baseUrl}${address}`;
}
