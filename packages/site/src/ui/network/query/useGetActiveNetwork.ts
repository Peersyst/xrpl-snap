import type { QueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { Network } from 'common/models/network/network.types';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import { Queries } from 'ui/query/queries';
import type { QueryResult } from 'ui/query/react-query-overrides';

export default function useGetActiveNetwork(options?: QueryOptions<Network, unknown, Network, Queries[]>): QueryResult<Network> {
  return useQuery({
    queryKey: [Queries.GET_ACTIVE_NETWORK],
    queryFn: async () => ControllerFactory.networkController.getActiveNetwork(),
    ...options,
  });
}
