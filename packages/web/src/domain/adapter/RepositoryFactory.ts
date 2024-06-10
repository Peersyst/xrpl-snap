import { TokenPriceRepository } from "data-access/repository/token-price/TokenPriceRepository";
import Factory from "../../common/utils/Factory";
import { MetamaskRepository } from "../../data-access/repository/metamask/MetamaskRepository";

export type IRepositoryFactory = {
    metamaskRepository: MetamaskRepository;
    tokenPriceRepository: TokenPriceRepository;
};

export default Factory<IRepositoryFactory>({
    metamaskRepository: () => new MetamaskRepository(),
    tokenPriceRepository: () => new TokenPriceRepository(),
});
