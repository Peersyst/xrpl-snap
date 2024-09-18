export interface Nft {
  flags: NftFlags;
  issuer: string;
  nftTokenId: string;
  nftTokenTaxon: number;
  nftSerial: number;
  uri?: string;
  metadata?: NftMetadata;
}

export type NftsWithMarker = {
  nfts: Nft[];
  marker: unknown;
};

export interface NftCollection {
  family?: string;
  name?: string;
}

export interface NftMetadata {
  name?: string;
  description?: string;
  image?: string;
  externalUrl?: string;
  attributes?: NftMetadataAttribute[];
  collection?: NftCollection;
}

export interface NftMetadataAttribute {
  traitType?: string;
  value?: string;
  displayType?: string | null;
}

export interface NftFlags {
  burnable: boolean;
  onlyXRP: boolean;
  trustLine: boolean;
  transferable: boolean;
}
