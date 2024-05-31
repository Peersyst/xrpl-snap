import { Fragment, type FunctionComponent, type ReactNode } from 'react';
import CardPage from 'ui/common/pages/CardPage/CardPage';
import { useLoad } from './ui/common/hooks/useLoad';
import LoadingPage from 'ui/common/pages/LoadingPage/LoadingPage';
import SnapModals from 'ui/snap/containers/SnapModals/SnapModals';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const loading = useLoad();

  return loading ? (
    <LoadingPage />
  ) : (
    <Fragment>
      <SnapModals />
      <CardPage>{children}</CardPage>
    </Fragment>
  );
};
