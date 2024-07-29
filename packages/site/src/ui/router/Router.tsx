import { ModalProvider } from '@peersyst/react-components';
import { config } from 'common/config';
import { BrowserRouter, Navigate, Outlet, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import CardPage from 'ui/common/pages/CardPage/CardPage';
import HomePage from 'ui/common/pages/HomePage/HomePage';
import { usePlaygroundRoutes } from 'ui/playground/router/PlaygroundRouter';
import { useReviewTransactionRoutes } from 'ui/review-transaction/router/ReviewTransactionRouter';
import SnapModals from 'ui/snap/containers/SnapModals/SnapModals';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';

export enum MainRoutes {
  MAIN = '/',
}

export const useHomeRoutes = (): RouteObject[] => {
  return [
    {
      element: (
        <CardPage>
          <Outlet />
        </CardPage>
      ),
      path: MainRoutes.MAIN,
      children: [
        {
          path: MainRoutes.MAIN,
          element: <HomePage />,
        },
      ],
    },
  ];
};

const Routes = () => {
  const dashboardRoutes = useHomeRoutes();
  const playgroundRoutes = usePlaygroundRoutes();
  const reviewTransactionRoutes = useReviewTransactionRoutes();

  return useRoutes([...dashboardRoutes, ...playgroundRoutes, ...reviewTransactionRoutes, { path: '*', element: <Navigate to="/" /> }]);
};

const Router = (): JSX.Element => {
  return (
    <BrowserRouter basename={config.publicUrl}>
      <ModalProvider>
        <ScrollToTop />
        <Routes />
        <SnapModals />
      </ModalProvider>
    </BrowserRouter>
  );
};

export default Router;
