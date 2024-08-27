import { useConfig } from '@peersyst/react-components';
import { useQuery } from '@tanstack/react-query';
import { BalanceInfo } from 'common/models/balance/balance';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import useSnapState from 'ui/adapter/state/useSnapState';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { Queries } from 'ui/query/queries';
import type { QueryOptions, QueryResult } from 'ui/query/react-query-overrides';

import useWalletState from '../../adapter/state/useWalletState';

export default function useGetBalanceInfo<T = BalanceInfo>({
  enabled = true,
  ...options
}: Omit<
  QueryOptions<BalanceInfo, unknown, T, (Queries | number | undefined | string | undefined)[]>,
  'refetchInterval' | ''
> = {}): QueryResult<T> {
  const { address } = useWalletState();
  const { data: network } = useGetActiveNetwork();
  const { isSnapInstalled } = useSnapState();
  const configRefetchIntervals = useConfig('refetchIntervals');

  return useQuery({
    refetchInterval: configRefetchIntervals.balance,
    enabled: enabled && Boolean(address) && isSnapInstalled,
    queryKey: [Queries.GET_BALANCE, address, network?.chainId],
    queryFn: async () => ControllerFactory.walletController.getBalance(),
    ...options,
  });
}
