import { ModalProvider } from '@peersyst/react-components';
import { config } from 'common/config';
import { BrowserRouter, Outlet, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import CardPage from 'ui/common/pages/CardPage/CardPage';
import HomePage from 'ui/common/pages/HomePage/HomePage';
import SnapPlaygroundPage from 'ui/snap/pages/SnapPlaygroundPage';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';

export enum MainRoutes {
  MAIN = '/',
  SNAP_PLAYGROUND = '/snap-playground',
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
        {
          path: MainRoutes.SNAP_PLAYGROUND,
          element: <SnapPlaygroundPage />,
        },
      ],
    },
  ];
};

const Routes = () => {
  const dashboardRoutes = useHomeRoutes();

  return useRoutes([...dashboardRoutes]);
};

const Router = (): JSX.Element => {
  return (
    <BrowserRouter basename={config.publicUrl}>
      <ModalProvider>
        <ScrollToTop />
        <Routes />
      </ModalProvider>
    </BrowserRouter>
  );
};

export default Router;
