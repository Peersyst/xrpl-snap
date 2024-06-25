import config from 'common/config/config';
import { TokenMetadata } from 'common/models';

export class TokenRepository {
  async getPrice(tokenId: string, currency: string): Promise<number> {
    try {
      const res = await fetch(`${config.coinPrice.apiUrl}/${tokenId}`);
      const data = await res.json();
      return data?.market_data?.current_price[currency];
    } catch (e) {
      return 0;
    }
  }

  async getIOUInfo(currency: string, issuer: string): Promise<TokenMetadata> {
    const id = `${currency}:${issuer}`;

    try {
      const res = await fetch(`${config.tokenMetadata.apiUrl}${id}`);
      const data = await res.json();

      return {
        price: data?.metrics?.price ?? 0,
        icon: data?.meta?.issuer?.icon ?? data?.meta?.token?.icon ?? '',
      };
    } catch (e) {
      return {
        price: 0,
        icon: '',
      };
    }
  }
}
