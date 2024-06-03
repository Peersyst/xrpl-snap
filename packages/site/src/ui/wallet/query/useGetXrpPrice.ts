import { useConfig } from '@peersyst/react-components';
import { useQuery } from '@tanstack/react-query';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import { Queries } from 'ui/query/queries';
import type { QueryOptions, QueryResult } from 'ui/query/react-query-overrides';

export default function useGetXrpPrice({
  refetchInterval,
  ...options
}: QueryOptions<
  number,
  unknown,
  number,
  (Queries | number | undefined)[]
> = {}): QueryResult<number> {
  const configRefetchIntervals = useConfig('refetchIntervals');

  return useQuery({
    refetchInterval: refetchInterval ?? configRefetchIntervals.coinPrice,
    queryKey: [Queries.GET_XRP_PRICE],
    queryFn: async () => ControllerFactory.tokenPriceController.getXrpPrice(),
    ...options,
  });
}
