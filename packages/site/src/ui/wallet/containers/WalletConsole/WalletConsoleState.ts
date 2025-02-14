import { create } from 'zustand';

interface WalletConsoleState {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

export const useWalletConsoleState = create<WalletConsoleState>((set) => ({
  isExpanded: false,
  setIsExpanded: (isExpanded: boolean) => set({ isExpanded }),
}));
