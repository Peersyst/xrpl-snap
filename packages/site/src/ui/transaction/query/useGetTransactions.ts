import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import { Queries } from 'ui/query/queries';

import type { TransactionsWithMarker } from '../../../domain/transaction/controller/TransactionController';
import useWalletState from '../../adapter/state/useWalletState';

export default function useGetTransactions() {
  const { address } = useWalletState();
  return useInfiniteQuery<
    TransactionsWithMarker,
    unknown,
    InfiniteData<TransactionsWithMarker>
  >({
    // TODO: Add network chain id in query key
    queryKey: [Queries.GET_TRANSACTIONS, address],
    initialPageParam: undefined,
    getNextPageParam: (res) => res.marker,
    enabled: Boolean(address),
    queryFn: async ({ pageParam }) =>
      ControllerFactory.transactionController.getAccountTransactions(
        address!,
        pageParam,
      ),
  });
}
