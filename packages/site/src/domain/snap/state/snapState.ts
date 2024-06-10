import { createStore } from 'zustand';

export type ISnapState = {
  // If metamask or flask (if needed) is installed
  isMetamaskInstalled: boolean;
  // If snap is installed
  isSnapInstalled: boolean;
};

const snapState = createStore<ISnapState>(() => ({
  isMetamaskInstalled: false,
  isSnapInstalled: false,
}));

export default snapState;
