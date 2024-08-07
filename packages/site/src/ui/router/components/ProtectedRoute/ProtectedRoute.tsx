import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath?: string;
  children: ReactNode;
};

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }: ProtectedRouteProps): JSX.Element => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
