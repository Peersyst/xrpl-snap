import { Col, Skeleton, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { useTheme } from 'styled-components';
import BaseCardListItem from 'ui/common/components/display/BaseCardListItem/BaseCardListItem';

import { NftCardImage, NftCardImageDefault } from './NftCard.styles';
import type { NftCardProps } from './NftCard.types';

export function NftCard({ className, nft, loading = false }: NftCardProps): JSX.Element {
  const { spacing } = useTheme();
  const image = nft.metadata?.image;
  const name = nft.metadata?.name || 'Unknown Name';
  const collection = nft.metadata?.collection?.name;

  return (
    <BaseCardListItem className={clsx('Nft', className)} gap={spacing[5]}>
      {image || loading ? <NftCardImage src={image || ''} alt="nft-image" /> : <NftCardImageDefault />}
      <Col justifyContent="center" gap="0.1rem">
        <Skeleton loading={loading}>
          <Typography variant="body1" fontWeight={500} numberOfLines={2}>
            {name}
          </Typography>
        </Skeleton>
        {collection && (
          <Skeleton loading={loading}>
            <Typography variant="body2" light fontWeight={400} numberOfLines={1}>
              {collection}
            </Typography>
          </Skeleton>
        )}
      </Col>
    </BaseCardListItem>
  );
}

export default NftCard;
