import { config } from 'common/config';
import { TokenPriceRepository } from 'data_access/repository/token-price/TokenPriceRepository';

export class TokenPriceController {
  constructor(private readonly tokenPriceRepository: TokenPriceRepository) {}

  async getXrpPrice(): Promise<number> {
    return await this.tokenPriceRepository.getPrice(
      config.coinPrice.xrpId,
      config.fiatCurrency,
    );
  }
}
