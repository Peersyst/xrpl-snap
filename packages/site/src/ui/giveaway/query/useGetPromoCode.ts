import { useQuery } from '@tanstack/react-query';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import useWalletState from 'ui/adapter/state/useWalletState';
import { Queries } from 'ui/query/queries';
import type { QueryResult } from 'ui/query/react-query-overrides';

export default function useGetPromoCode(): QueryResult<string> {
  const { address } = useWalletState();

  return useQuery({
    enabled: Boolean(address),
    queryKey: [Queries.GET_PROMO_CODE, address],
    queryFn: async () => ControllerFactory.giveAwayController.getPomoCode(address!),
  });
}
