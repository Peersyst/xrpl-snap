import config from "common/config/config";

export class TokenPriceRepository {
    private readonly apiUrl = config.coinPrice.apiUrl;

    async getPrice(tokenId: string, currency: string): Promise<number> {
        try {
            const res = await fetch(`${this.apiUrl}/${tokenId}`);
            const data = await res.json();
            return data?.market_data?.current_price[currency];
        } catch (e) {
            return 0;
        }
    }
}
