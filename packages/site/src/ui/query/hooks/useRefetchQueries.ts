import type { RefetchQueryFilters, RefetchOptions } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Returns a function to refetch queries.
 * @returns A function to refetch queries.
 */
export function useRefetchQueries(): (filters?: RefetchQueryFilters, options?: RefetchOptions) => Promise<void> {
  const queryClient = useQueryClient();

  return async function refetchQueries(filters?: RefetchQueryFilters, options?: RefetchOptions): Promise<void> {
    return queryClient.refetchQueries(filters, options);
  };
}
