import { Transak } from '@transak/transak-sdk';
import { useContext } from 'react';

import { TransakContext } from '../context/TransakContext';

export default function useTransakContext(): Transak {
  const context = useContext(TransakContext);
  if (!context || context.transak === undefined) {
    throw new Error('You should use useTransakContext inside TransakProvider');
  }

  return context.transak;
}
