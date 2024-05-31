import { QueryOptions, useQuery } from '@tanstack/react-query';
import { Network } from 'common/models/network/network.types';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import { Queries } from 'ui/query/queries';
import { QueryResult } from 'ui/query/react-query-overrides';

export default function useGetStoredNetworks(
  options?: QueryOptions<Network[], unknown, Network[], Queries[]>,
): QueryResult<Network[]> {
  return useQuery({
    queryKey: [Queries.GET_STORED_NETWORKS],
    queryFn: () => ControllerFactory.networkController.getStoredNetworks(),
    ...options,
  });
}
