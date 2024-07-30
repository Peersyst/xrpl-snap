import { useConfig } from '@peersyst/react-components-core';
import { Transak, TransakConfig } from '@transak/transak-sdk';
import { useMemo } from 'react';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';

import { TransakContextProvider } from './TransakContext';

export interface TransakProviderProps {
  children?: React.ReactNode;
}

function TransakProvider({ children }: TransakProviderProps) {
  const transakConfig = useConfig('transak');
  const walletAddress = useGetAddress();

  const transak = useMemo(() => {
    if (!walletAddress) {
      return undefined;
    }
    return new Transak({ ...transakConfig, walletAddress } as TransakConfig);
  }, [transakConfig, walletAddress]);

  return <TransakContextProvider value={{ transak }}>{children}</TransakContextProvider>;
}

export default TransakProvider;
