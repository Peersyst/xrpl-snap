import { createStore } from 'zustand';

export interface ISnapState {
  isInitialized: boolean;
}

const snapState = createStore<ISnapState>(() => ({
  isInitialized: false,
}));

export default snapState;
