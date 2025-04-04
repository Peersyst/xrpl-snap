import { useMutation } from '@tanstack/react-query';
import { AddTokenParams } from 'common/models/token/add.types';
import useWalletState from 'ui/adapter/state/useWalletState';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { useInvalidateQueries } from 'ui/query/hooks/useInvalidateQueries';
import { Queries } from 'ui/query/queries';

import ControllerFactory from '../../adapter/ControllerFactory';

export default function useAddToken() {
  const invalidateQueries = useInvalidateQueries();
  const { address } = useWalletState();
  const { data: network } = useGetActiveNetwork();

  return useMutation({
    mutationFn: async (params: AddTokenParams) => ControllerFactory.tokenController.addToken(params),
    onSuccess: () => {
      invalidateQueries({
        queryKey: [Queries.GET_TOKENS, address, network?.chainId],
      });
    },
  });
}
