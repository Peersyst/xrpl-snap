import { createStore } from 'zustand';

export type ISnapState = {
  // If metamask or flask (if needed) is installed
  isMetaMaskInstalled: boolean;
  // If snap is installed
  isSnapInstalled: boolean;
};

const snapState = createStore<ISnapState>(() => ({
  isMetaMaskInstalled: false,
  isSnapInstalled: false,
}));

export default snapState;
