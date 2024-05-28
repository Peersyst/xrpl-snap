import type { FunctionComponent, ReactNode } from 'react';

import { MetaMaskProvider } from './ui/snap/MetamaskContext';

export type RootProps = {
  children: ReactNode;
};

export const Root: FunctionComponent<RootProps> = ({ children }) => {
  return <MetaMaskProvider>{children}</MetaMaskProvider>;
};
