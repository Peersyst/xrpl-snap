import { useMutation } from '@tanstack/react-query';
import type { SendParams } from 'common/models/transaction/send.types';
import useWalletState from 'ui/adapter/state/useWalletState';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { useInvalidateInfiniteQuery } from 'ui/query/hooks/useInvalidateInfiniteQuery';
import { useInvalidateQueries } from 'ui/query/hooks/useInvalidateQueries';
import { Queries } from 'ui/query/queries';

import ControllerFactory from '../../adapter/ControllerFactory';

export default function useSend() {
  const invalidateQueries = useInvalidateQueries();
  const invalidateInfiniteQueries = useInvalidateInfiniteQuery();
  const { address } = useWalletState();
  const { data: network } = useGetActiveNetwork();

  return useMutation({
    mutationFn: async (params: SendParams) => ControllerFactory.transactionController.sendTransaction(params),
    onSuccess: () => {
      invalidateQueries({
        queryKey: [Queries.GET_BALANCE, address, network?.chainId],
      });
      invalidateQueries({
        queryKey: [Queries.GET_TOKENS, address, network?.chainId],
      });
      invalidateInfiniteQueries([Queries.GET_TRANSACTIONS, address, String(network?.chainId)]);
    },
  });
}
