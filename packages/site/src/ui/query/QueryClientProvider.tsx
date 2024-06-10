import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

import type { IDomainError } from '../adapter/IDomainError';
import isDomainError from '../adapter/utils/isDomainError';
import UIErrorEvent from '../error/UIErrorEvent';

/**
 * Receives an error and dispatches a UIErrorEvent
 * @param error - The error to handle
 */
function handleQueryClientError(error: IDomainError | any): void {
  if (isDomainError(error)) {
    UIErrorEvent.dispatch(error.code, error.severity);
  } else {
    UIErrorEvent.dispatch(error.message);
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 600000,
    },
    mutations: {
      onError: handleQueryClientError,
    },
  },
});

const QueryClientProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
};

export default QueryClientProvider;
