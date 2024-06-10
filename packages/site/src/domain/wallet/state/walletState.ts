import { createStore } from 'zustand';

export type IWalletState = {
  address?: string;
};

const walletState = createStore<IWalletState>(() => ({}));

export default walletState;
