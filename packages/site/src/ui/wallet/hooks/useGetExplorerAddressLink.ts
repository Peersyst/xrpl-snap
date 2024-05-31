import useGetAddress from './useGetAddress';

export default function useGetExplorerAddressLink(): string {
  const address = useGetAddress();
  return address;
}
