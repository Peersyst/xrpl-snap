import { useConfig } from '@peersyst/react-components-core';
import { Outlet, RouteObject } from 'react-router-dom';
import CardPage from 'ui/common/pages/CardPage/CardPage';

import SnapPlaygroundPage from '../pages/SnapPlaygroundPage';
import { PlaygroundRoutes } from './PlaygroundRoutes.types';

export const usePlaygroundRoutes = (): RouteObject[] => {
  const { enablePlayground } = useConfig('featureFlags');

  if (!enablePlayground) {
    return [];
  }
  return [
    {
      path: PlaygroundRoutes.MAIN,
      element: (
        <CardPage>
          <Outlet />
        </CardPage>
      ),
      children: [
        {
          path: PlaygroundRoutes.MAIN,
          element: <SnapPlaygroundPage />,
        },
      ],
    },
  ];
};
