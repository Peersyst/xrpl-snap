import { ModalProvider } from '@peersyst/react-components';
import { config } from 'common/config';
import { BrowserRouter, Navigate, Outlet, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import CardPage from 'ui/common/pages/CardPage/CardPage';
import HomePage from 'ui/common/pages/HomePage/HomePage';
import { usePlaygroundRoutes } from 'ui/playground/router/PlaygroundRouter';

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

  return useRoutes([...dashboardRoutes, ...playgroundRoutes, { path: '*', element: <Navigate to="/" /> }]);
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
