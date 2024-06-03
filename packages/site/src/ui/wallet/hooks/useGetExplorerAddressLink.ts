import useGetAddress from './useGetAddress';

export default function useGetExplorerAddressLink(): string {
  const address = useGetAddress();
  //TODO: Handle different networks
  return address ? `https://explorer.solana.com/address/${address}` : '';
}
