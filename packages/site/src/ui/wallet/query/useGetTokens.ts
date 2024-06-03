import { useQuery } from '@tanstack/react-query';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import { Queries } from 'ui/query/queries';
import type { QueryOptions, QueryResult } from 'ui/query/react-query-overrides';
import type { TokenWithBalance } from '../../../common/models/token';
import useWalletState from '../../adapter/state/useWalletState';
import useSnapState from 'ui/adapter/state/useSnapState';

export default function useGetTokens({
  enabled = true,
  ...options
}: QueryOptions<
  TokenWithBalance[],
  unknown,
  TokenWithBalance[],
  Queries[]
> = {}): QueryResult<TokenWithBalance[]> {
  const { address } = useWalletState();
  const { isSnapInstalled } = useSnapState();

  return useQuery({
    enabled: enabled && isSnapInstalled && Boolean(address),
    queryKey: [Queries.GET_TOKENS],
    queryFn: async () => ControllerFactory.walletController.getTokens(),
    ...options,
  });
}
