import { TokenRepository } from 'data-access/repository/token/TokenRepository';

import Factory from '../../common/utils/Factory';
import { MetaMaskRepository } from '../../data-access/repository/metamask/MetaMaskRepository';
import { FundRepository } from '../../data-access/repository/xrpl/FundRepository';
import { XrplService } from '../../data-access/repository/xrpl/XrplService';

export type IRepositoryFactory = {
  metamaskRepository: MetaMaskRepository;
  tokenRepository: TokenRepository;
  fundRepository: FundRepository;
  xrplService: XrplService;
};

export default Factory<IRepositoryFactory>({
  metamaskRepository: () => new MetaMaskRepository(),
  tokenRepository: () => new TokenRepository(),
  fundRepository: () => new FundRepository(),
  xrplService: () => new XrplService(),
});
