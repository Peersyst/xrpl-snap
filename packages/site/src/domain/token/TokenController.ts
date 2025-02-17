import { config } from 'common/config';
import { Token, TokenMetadata } from 'common/models';
import { AddTokenParams } from 'common/models/token/add.types';
import { MetaMaskRepository } from 'data-access/repository/metamask/MetaMaskRepository';
import type { TokenRepository } from 'data-access/repository/token/TokenRepository';

export class TokenController {
  constructor(private readonly tokenRepository: TokenRepository, private readonly metamaskRepository: MetaMaskRepository) {}

  async getXrpPrice(): Promise<number> {
    return await this.tokenRepository.getPrice(config.coinPrice.xrpId, config.fiatCurrency);
  }

  async getIOUInfo(token: Token): Promise<TokenMetadata> {
    return await this.tokenRepository.getIOUInfo(token.currency, token.issuer);
  }

  async addToken(addToken: AddTokenParams): Promise<void> {
    await this.metamaskRepository.addToken(addToken);
  }
}
