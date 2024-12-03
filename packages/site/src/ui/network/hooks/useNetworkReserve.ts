import { useQuery } from '@tanstack/react-query';
import { NetworkReserve } from 'common/models';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import useSnapState from 'ui/adapter/state/useSnapState';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { Queries } from 'ui/query/queries';
import type { QueryOptions, QueryResult } from 'ui/query/react-query-overrides';

export default function useNetworkReserve<T = NetworkReserve>({
  enabled = true,
  ...options
}: Omit<
  QueryOptions<NetworkReserve, unknown, T, (Queries | number | undefined | string | undefined)[]>,
  'refetchInterval' | ''
> = {}): QueryResult<T> {
  const { data: network } = useGetActiveNetwork();
  const { isSnapInstalled } = useSnapState();

  return useQuery({
    enabled: enabled && isSnapInstalled && Boolean(network),
    queryKey: [Queries.GET_NETWORK_RESERVE, network?.chainId],
    queryFn: async () => ControllerFactory.networkController.getNetworkReserve(),
    ...options,
  });
}
