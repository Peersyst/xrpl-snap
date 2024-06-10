import { useQuery } from '@tanstack/react-query';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import useSnapState from 'ui/adapter/state/useSnapState';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { Queries } from 'ui/query/queries';
import type { QueryOptions, QueryResult } from 'ui/query/react-query-overrides';

import type { TokenWithBalance } from '../../../common/models/token';
import useWalletState from '../../adapter/state/useWalletState';

export default function useGetTokens({
  enabled = true,
  ...options
}: QueryOptions<TokenWithBalance[], unknown, TokenWithBalance[], (Queries | boolean | number | undefined | string)[]> = {}): QueryResult<
  TokenWithBalance[]
> {
  const { address } = useWalletState();
  const { isSnapInstalled } = useSnapState();
  const { data: activeNetwork } = useGetActiveNetwork();

  return useQuery({
    enabled: enabled && isSnapInstalled && Boolean(address),
    queryKey: [Queries.GET_TOKENS, address, activeNetwork?.chainId],
    queryFn: async () => ControllerFactory.walletController.getTokens(),
    ...options,
  });
}
