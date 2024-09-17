import { useConfig } from '@peersyst/react-components-core';
import { useMutation } from '@tanstack/react-query';
import useWalletState from 'ui/adapter/state/useWalletState';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { useInvalidateInfiniteQuery } from 'ui/query/hooks/useInvalidateInfiniteQuery';
import { useInvalidateQueries } from 'ui/query/hooks/useInvalidateQueries';
import { Queries } from 'ui/query/queries';

import ControllerFactory from '../../adapter/ControllerFactory';

export default function useFundWallet() {
  const invalidateQueries = useInvalidateQueries();
  const invalidateInfiniteQueries = useInvalidateInfiniteQuery();
  const { address } = useWalletState();
  const { data: network } = useGetActiveNetwork();
  const { xrpAmount } = useConfig('faucet');

  return useMutation({
    mutationFn: async () => ControllerFactory.walletController.fundWallet(xrpAmount),
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
