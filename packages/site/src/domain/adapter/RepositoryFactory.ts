import { TokenRepository } from 'data-access/repository/token/TokenRepository';

import Factory from '../../common/utils/Factory';
import { MetamaskRepository } from '../../data-access/repository/metamask/MetamaskRepository';

export type IRepositoryFactory = {
  metamaskRepository: MetamaskRepository;
  tokenRepository: TokenRepository;
};

export default Factory<IRepositoryFactory>({
  metamaskRepository: () => new MetamaskRepository(),
  tokenRepository: () => new TokenRepository(),
});
