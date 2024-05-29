import { PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider as BaseQueryClientProvider,
} from 'react-query';
import UIErrorEvent from '../error/UIErrorEvent';
import isDomainError from '../adapter/utils/isDomainError';
import { IDomainError } from '../adapter/IDomainError';

/**
 * Receives an error and dispatches a UIErrorEvent
 * @param error The error to handle
 */
function handleQueryClientError(error: IDomainError | any): void {
  if (isDomainError(error))
    UIErrorEvent.dispatch(error.code, undefined, error.severity);
  else UIErrorEvent.dispatch(error.message);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 600000,
      onError: handleQueryClientError,
    },
    mutations: {
      onError: handleQueryClientError,
    },
  },
});

const QueryClientProvider = ({
  children,
}: PropsWithChildren<{}>): JSX.Element => {
  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;
