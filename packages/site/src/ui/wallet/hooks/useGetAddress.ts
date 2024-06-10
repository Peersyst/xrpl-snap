import { useStore } from 'zustand';

import walletState from '../../../domain/wallet/state/walletState';

export default function useGetAddress() {
  const useWalletState = useStore(walletState);
  return useWalletState.address;
}
