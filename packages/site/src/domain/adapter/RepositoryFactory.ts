import Factory from '../../common/utils/Factory';
import { MetamaskRepository } from '../../data_access/repository/metamask/MetamaskRepository';

export type IRepositoryFactory = {
  metamaskRepository: MetamaskRepository;
};

export default Factory<IRepositoryFactory>({
  metamaskRepository: () => new MetamaskRepository(),
});
