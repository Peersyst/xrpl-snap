import { createStore } from 'zustand';

export interface IWalletState {
  address?: string;
}

const walletState = createStore<IWalletState>(() => ({}));

export default walletState;
