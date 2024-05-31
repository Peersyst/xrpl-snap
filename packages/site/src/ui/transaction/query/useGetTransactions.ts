import type {
  QueryOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import { Queries } from 'ui/query/queries';
import type { Transaction } from 'xrpl';

import useWalletState from '../../adapter/state/useWalletState';

export default function useGetTransactions(
  options?: any,
): UseInfiniteQueryResult<
  { transactions: Transaction[]; marker: unknown },
  unknown
> {
  const { address } = useWalletState();
  return useInfiniteQuery({
    // TODO: Add network chain id in query key
    queryKey: [Queries.GET_TRANSACTIONS, address],
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage as any).marker,
    enabled: Boolean(address),
    queryFn: async ({ pageParam }) =>
      ControllerFactory.transactionController.getAccountTransactions(
        address!,
        pageParam,
      ),
    ...options,
  });
}
