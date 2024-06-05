import {
  BlockchainAddressProps,
  useComponentConfig,
} from '@peersyst/react-components';
import useGetActiveNetwork from '../query/useGetActiveNetwork';
import {
  BlockchainAddressType,
  NetworkChainId,
} from 'common/models/network/network.types';

export function useBlockchainAddressUrl(
  typeParam: BlockchainAddressType,
  address: string,
) {
  const { data: network } = useGetActiveNetwork();

  const type = ((): BlockchainAddressProps['type'] => {
    if (network?.chainId === NetworkChainId.TESTNET)
      return typeParam === 'address' ? 'testnetAddress' : 'testnetTx';
    else return typeParam === 'address' ? 'mainnetAddress' : 'mainnetTx';
  })();

  const { blockchainLinks } = useComponentConfig('BlockchainAddress');
  const baseUrl = blockchainLinks[type];

  return `${baseUrl}${address}`;
}
