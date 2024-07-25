import { BalanceInfo } from 'common/models/balance/balance';
import Amount from 'common/utils/Amount';
import { Queries } from 'ui/query/queries';
import { QueryOptions, UseQueryResult } from 'ui/query/react-query-overrides';

import useGetBalanceInfo from './useGetBalanceInfo';

export default function useGetBalance(
  options: Omit<
    QueryOptions<BalanceInfo, unknown, Amount, (Queries | number | undefined | string | undefined)[]>,
    'refetchInterval' | 'staleTime' | 'select'
  > = {},
): UseQueryResult<Amount, unknown> {
  return useGetBalanceInfo<Amount>({ select: (data) => data.expendable, ...options });
}
