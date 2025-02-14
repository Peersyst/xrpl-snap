import { BalanceInfo } from 'common/models/balance/balance';
import { TokenWithBalance } from 'common/models/token';
import { createStore } from 'zustand';

export type IWalletState = {
  address?: string;
  balance?: BalanceInfo | null;
  tokens?: TokenWithBalance[];
  lastUpdated?: number;
};

const walletState = createStore<IWalletState>(() => ({}));

export default walletState;
