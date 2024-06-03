import Factory from 'common/utils/Factory';
import NetworkController from 'domain/network/controller/NetworkController';
import SnapController from 'domain/snap/controller/SnapController';

import RepositoryFactory from '../../domain/adapter/RepositoryFactory';
import snapState from '../../domain/snap/state/snapState';
import WalletController from '../../domain/wallet/controller/WalletController';
import walletState from '../../domain/wallet/state/walletState';
import TransactionController from '../../domain/transaction/controller/TransactionController';
import { TokenPriceController } from 'domain/token-price/TokenPriceController';

export type IControllerFactory = {
  snapController: SnapController;
  walletController: WalletController;
  networkController: NetworkController;
  transactionController: TransactionController;
  tokenPriceController: TokenPriceController;
};

export default Factory<IControllerFactory>({
  snapController: () =>
    new SnapController(snapState, RepositoryFactory.metamaskRepository),
  walletController: () =>
    new WalletController(walletState, RepositoryFactory.metamaskRepository),
  networkController: () =>
    new NetworkController(RepositoryFactory.metamaskRepository),
  transactionController: () =>
    new TransactionController(RepositoryFactory.metamaskRepository),
  tokenPriceController: () =>
    new TokenPriceController(RepositoryFactory.tokenPriceRepository),
});
