import type { FunctionComponent, ReactNode } from 'react';
import CardPage from 'ui/common/pages/CardPage/CardPage';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  return <CardPage>{children}</CardPage>;
};
