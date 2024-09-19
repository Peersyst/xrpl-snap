import { InfiniteScrollProps } from '@peersyst/react-components';
import clsx from 'clsx';
import { Nft } from 'common/models/nft/nft.types';
import useWalletState from 'ui/adapter/state/useWalletState';
import { InfiniteList } from 'ui/common/components/display/InfiniteList/InfiniteList';
import NothingToShow from 'ui/common/components/feedback/NothingToShow/NothingToShow';
import { useTranslate } from 'ui/locale';
import NftCard from 'ui/nft/components/display/NftCard/NftCard';
import useGetNfts from 'ui/nft/query/useGetNfts';

export type NftListProps = {
  className?: string;
  style?: React.CSSProperties;
  container?: InfiniteScrollProps['container'];
};

const NftCardSkeleton = () => (
  <NftCard
    nft={{
      flags: { burnable: true, onlyXRP: true, transferable: true, trustLine: false },
      nftTokenId: 'id',
      nftSerial: 2,
      issuer: '',
      nftTokenTaxon: 2,
      metadata: { name: 'Loading Nft', collection: { name: 'Loading Nft Collection' } },
    }}
    loading
  />
);

function NftList({ className, ...rest }: NftListProps) {
  const translate = useTranslate();

  const { address } = useWalletState();
  const { data, isFetching, isRefetching, fetchNextPage, hasNextPage } = useGetNfts();

  function handleEndReached() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  const loading = (!address || isFetching) && !isRefetching;

  return (
    <InfiniteList<Nft>
      className={clsx('NftList', className)}
      renderItem={(nft, i) => <NftCard key={i} nft={nft} />}
      isLoading={loading}
      Skeleton={NftCardSkeleton}
      numberOfSkeletons={5}
      data={data?.pages.flatMap((page) => page.nfts)}
      nothingToShow={<NothingToShow css={{ paddingTop: '2rem' }} message={translate('nothingToShow', { context: 'nft' })} />}
      onEndReached={handleEndReached}
      end={!hasNextPage}
      {...rest}
    />
  );
}

export default NftList;
