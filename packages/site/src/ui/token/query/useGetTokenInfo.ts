import { useQuery } from '@tanstack/react-query';
import { NetworkChainId, Token, TokenMetadata } from 'common/models';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { Queries } from 'ui/query/queries';
import type { QueryOptions, QueryResult } from 'ui/query/react-query-overrides';

import useWalletState from '../../adapter/state/useWalletState';

export default function useGetTokenInfo(
  token: Token,
  {
    enabled = true,
    refetchInterval,
    ...options
  }: QueryOptions<TokenMetadata, unknown, TokenMetadata, (Queries | number | undefined | string | undefined)[]> = {},
): QueryResult<TokenMetadata> {
  const { address } = useWalletState();
  const { data: network } = useGetActiveNetwork();

  return useQuery({
    enabled: enabled && Boolean(address) && network?.chainId === NetworkChainId.MAINET,
    queryKey: [Queries.GET_TOKEN_INFO, address, network?.chainId, token.currency, token.issuer],
    queryFn: async () => ControllerFactory.tokenController.getIOUInfo(token),
    ...options,
  });
}
