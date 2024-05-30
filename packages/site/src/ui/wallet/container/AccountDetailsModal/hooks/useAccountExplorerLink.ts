import { useComponentConfig } from '@peersyst/react-components';

export default function useAccountExplorerLink(address: string) {
  const { blockchainLinks } = useComponentConfig('BlockchainAddress');
  return blockchainLinks['account'] + address;
}
