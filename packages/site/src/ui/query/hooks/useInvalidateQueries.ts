import type { InvalidateOptions, InvalidateQueryFilters } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Returns a function to invalidate queries.
 * @returns A function to invalidate queries.
 */
export function useInvalidateQueries(): (filters?: InvalidateQueryFilters, options?: InvalidateOptions) => Promise<void> {
  const queryClient = useQueryClient();

  return async function invalidateQueries(filters?: InvalidateQueryFilters, options?: InvalidateOptions): Promise<void> {
    return queryClient.invalidateQueries(filters, options);
  };
}
