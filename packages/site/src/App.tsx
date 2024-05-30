import type { FunctionComponent, ReactNode } from 'react';
import BasePage from 'ui/common/components/layout/BasePage/BasePage';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  return <BasePage>{children}</BasePage>;
};
