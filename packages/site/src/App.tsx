import type { FunctionComponent, ReactNode } from 'react';
import CardPage from 'ui/common/pages/CardPage/CardPage';
import SideBar from './ui/common/containers/SideBar/SideBar';
import { Row } from '@peersyst/react-components';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  return <CardPage>
    <Row flex={1}>
      <SideBar />
      {children}
    </Row>
  </CardPage>;
};
