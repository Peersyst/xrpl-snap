import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { TransactionsWithMarker } from 'common/models/transaction/tx.types';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { Queries } from 'ui/query/queries';

import useWalletState from '../../adapter/state/useWalletState';

export default function useGetTransactions() {
  const { address } = useWalletState();
  const { data: activeNetwork } = useGetActiveNetwork();

  return useInfiniteQuery<TransactionsWithMarker, unknown, InfiniteData<TransactionsWithMarker>>({
    queryKey: [Queries.GET_TRANSACTIONS, address, String(activeNetwork?.chainId)],
    initialPageParam: undefined,
    getNextPageParam: (res) => res.marker,
    enabled: Boolean(address),
    queryFn: async ({ pageParam }) => ControllerFactory.transactionController.getAccountTransactions(address!, pageParam),
  });
}
