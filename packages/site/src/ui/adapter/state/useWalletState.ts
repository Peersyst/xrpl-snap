import { useStore } from 'zustand';

import walletState from '../../../domain/wallet/state/walletState';

const useWalletState = () => useStore(walletState);

export default useWalletState;
