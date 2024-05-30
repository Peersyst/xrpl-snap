import type { FunctionComponent, ReactNode } from 'react';
import Providers from './ui/Providers';

export type RootProps = {
  children: ReactNode;
};

export const Root: FunctionComponent<RootProps> = ({ children }) => {
  return <Providers>{children}</Providers>;
};
