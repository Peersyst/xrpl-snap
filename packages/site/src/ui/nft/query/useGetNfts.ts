import { useInfiniteQuery } from '@tanstack/react-query';
import { NftsWithMarker } from 'common/models/nft/nft.types';
import ControllerFactory from 'ui/adapter/ControllerFactory';
import useSnapState from 'ui/adapter/state/useSnapState';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { Queries } from 'ui/query/queries';
import type { InfiniteData } from 'ui/query/react-query-overrides';

import useWalletState from '../../adapter/state/useWalletState';

export default function useGetNfts() {
  const { address } = useWalletState();
  const { isSnapInstalled } = useSnapState();
  const { data: activeNetwork } = useGetActiveNetwork();

  return useInfiniteQuery<NftsWithMarker, unknown, InfiniteData<NftsWithMarker>>({
    enabled: isSnapInstalled && Boolean(address),
    queryKey: [Queries.GET_NFTS, address, activeNetwork?.chainId],
    initialPageParam: undefined,
    getNextPageParam: (res) => res.marker,
    queryFn: async ({ pageParam }) => ControllerFactory.nftController.getNfts(address!, pageParam),
  });
}
