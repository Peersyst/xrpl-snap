import { Nft } from 'common/models/nft/nft.types';

export type NftCardProps = {
  nft: Nft;
  loading?: boolean;
  className?: string;
};
