/* eslint-disable  no-bitwise */
import { config } from 'common/config';
import { Nft, NftCollection, NftMetadata, NftMetadataAttribute, NftsWithMarker } from 'common/models/nft/nft.types';
import { withRetries } from 'common/query';
import { MetaMaskRepository } from 'data-access/repository/metamask/MetaMaskRepository';
import { AccountNFToken, convertHexToString } from 'xrpl';

import { convertIpfsToGateway } from './utils/convertIpfsToGateway';
/**
 * Controller class for handling NFT-related logic.
 */
export class NftController {
  constructor(private readonly metamaskRepository: MetaMaskRepository) {}

  /**
   * Fetches NFTs for a given account and retrieves their metadata.
   * @param account - The account address to fetch NFTs for.
   * @param marker - The marker to fetch the next page of NFTs.
   * @returns A promise that resolves to an array of NFTs.
   */
  async getNfts(account: string, marker: unknown): Promise<NftsWithMarker> {
    try {
      const { result } = await withRetries(
        async () => this.metamaskRepository.getNfts(account, marker),
        config.retry.times,
        config.retry.delay,
      );
      const accountNfts = result?.account_nfts ?? [];
      const markers = result?.marker;

      const nftPromises = accountNfts.map(async (nft) => this.processNft(nft));
      const nfts = await Promise.allSettled(nftPromises);

      const processedNfts = nfts
        .filter((result) => result.status === 'fulfilled')
        .map((result) => (result as PromiseFulfilledResult<Nft>).value);

      return {
        nfts: processedNfts,
        marker: markers,
      };
    } catch (error) {
      return {
        nfts: [],
        marker: undefined,
      };
    }
  }

  private async processNft({ URI, NFTokenID, NFTokenTaxon, nft_serial, Issuer, Flags }: AccountNFToken): Promise<Nft> {
    const nft: Nft = {
      issuer: Issuer,
      nftTokenTaxon: NFTokenTaxon,
      nftSerial: nft_serial,
      nftTokenId: NFTokenID,
      flags: this.parseNftFlags(Flags),
    };

    if (URI) {
      const url = convertHexToString(URI);
      nft.metadata = await this.getNftMetadata(url);
      nft.uri = url;
    }

    return nft;
  }

  /**
   * Fetches metadata for a given NFT URI.
   * Supports both IPFS and HTTP(S) URLs.
   * @param nftUri - The URI of the NFT metadata.
   * @returns A promise that resolves to the NFT metadata.
   */
  private async getNftMetadata(nftUri: string): Promise<NftMetadata | undefined> {
    try {
      let response;

      if (nftUri.startsWith('ipfs://')) {
        const gatewayUrl = convertIpfsToGateway(nftUri);
        response = await fetch(gatewayUrl);
      } else if (nftUri.startsWith('https://')) {
        response = await fetch(nftUri);
      }

      if (response?.ok) {
        const metadata = await response.json();
        return this.parseNftMetadata(metadata);
      }
    } catch (error) {
      console.warn('Failed to fetch NFT metadata:', error);
      return undefined;
    }
  }

  private parseNftMetadata(metadata: any): NftMetadata | undefined {
    if (!metadata || typeof metadata !== 'object') {
      return;
    }

    const parsedMetadata: NftMetadata = {};

    if (typeof metadata.name === 'string') {
      parsedMetadata.name = metadata.name;
    }

    if (typeof metadata.description === 'string') {
      parsedMetadata.description = metadata.description;
    }

    const image = metadata.image || metadata.image_url || metadata.animation;
    if (typeof image === 'string') {
      parsedMetadata.image = convertIpfsToGateway(image);
    }

    if (typeof metadata?.externalUrl === 'string') {
      parsedMetadata.externalUrl = metadata.externalUrl;
    }

    parsedMetadata.collection = this.parseCollection(metadata.collection);

    if (Array.isArray(metadata?.attributes)) {
      const attributes = [];
      for (const attribute of metadata.attributes) {
        const parsedAttribute = this.parseNftMetadataAttribute(attribute);
        if (parsedAttribute) {
          attributes.push(parsedAttribute);
        }
      }
    }

    return parsedMetadata;
  }

  private parseCollection(collection: any): NftCollection | undefined {
    if (!collection || typeof collection !== 'object') {
      return;
    }

    const parsedCollection: NftCollection = {};

    if (typeof collection?.family === 'string') {
      parsedCollection.family = collection.family;
    }

    if (typeof collection?.name === 'string') {
      parsedCollection.name = collection.name;
    }

    return parsedCollection;
  }

  private parseNftMetadataAttribute(attribute: any): NftMetadataAttribute | undefined {
    if (!attribute || typeof attribute !== 'object') {
      return;
    }

    const parsedAttribute: NftMetadataAttribute = {};

    if (typeof attribute?.traitType === 'string') {
      parsedAttribute.traitType = attribute.traitType;
    }

    if (typeof attribute?.value === 'string') {
      parsedAttribute.value = attribute.value;
    }

    if (typeof attribute?.displayType === 'string') {
      parsedAttribute.displayType = attribute.displayType;
    }

    return parsedAttribute;
  }

  private parseNftFlags(flags: number) {
    return {
      burnable: Boolean(flags & 1),
      onlyXRP: Boolean(flags & (1 << 1)),
      trustLine: false,
      transferable: Boolean(flags & (1 << 3)),
    };
  }
}
