import { config } from 'common/config';
import { Token, TokenMetadata } from 'common/models';
import type { TokenRepository } from 'data-access/repository/token/TokenRepository';

export class TokenController {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async getXrpPrice(): Promise<number> {
    return await this.tokenRepository.getPrice(config.coinPrice.xrpId, config.fiatCurrency);
  }

  async getIOUInfo(token: Token): Promise<TokenMetadata> {
    return await this.tokenRepository.getIOUInfo(token.currency, token.issuer);
  }
}
