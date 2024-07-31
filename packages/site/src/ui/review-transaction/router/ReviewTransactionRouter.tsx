import { Outlet, RouteObject } from 'react-router-dom';

import ReviewTransactionPage from '../pages/ReviewTransactionPage';
import { ReviewTransactionRoutes } from './ReviewTransactionRoutes.types';

export const useReviewTransactionRoutes = (): RouteObject[] => {
  return [
    {
      path: ReviewTransactionRoutes.MAIN,
      element: <Outlet />,
      children: [
        {
          path: ReviewTransactionRoutes.MAIN,
          element: <ReviewTransactionPage />,
        },
      ],
    },
  ];
};
