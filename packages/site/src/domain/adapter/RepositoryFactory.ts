import { TokenRepository } from 'data-access/repository/token/TokenRepository';

import Factory from '../../common/utils/Factory';
import { MetaMaskRepository } from '../../data-access/repository/metamask/MetaMaskRepository';

export type IRepositoryFactory = {
  metamaskRepository: MetaMaskRepository;
  tokenRepository: TokenRepository;
};

export default Factory<IRepositoryFactory>({
  metamaskRepository: () => new MetaMaskRepository(),
  tokenRepository: () => new TokenRepository(),
});
