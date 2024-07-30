import { Transak } from '@transak/transak-sdk';
import { createContext } from 'react';

export interface ITransakContext {
  transak?: Transak;
}

export const TransakContext = createContext<ITransakContext | undefined>(undefined);

export const TransakContextProvider = TransakContext.Provider;
export const TransakContextConsumer = TransakContext.Consumer;
