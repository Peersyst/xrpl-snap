import type { QueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import { Queries } from 'ui/query/queries';
import type { QueryResult } from 'ui/query/react-query-overrides';

import type { TokenWithBalance } from '../../../common/models/token';
import useWalletState from '../../adapter/state/useWalletState';

export default function useGetTokens(
  options?: QueryOptions<
    TokenWithBalance[],
    unknown,
    TokenWithBalance[],
    Queries[]
  >,
): QueryResult<TokenWithBalance[]> {
  const { address } = useWalletState();
  return useQuery({
    enabled: Boolean(address),
    queryKey: [Queries.GET_TOKENS],
    queryFn: async () => ControllerFactory.walletController.getTokens(),
    ...options,
  });
}
