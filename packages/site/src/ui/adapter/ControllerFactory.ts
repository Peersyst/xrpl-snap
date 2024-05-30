import Factory from 'common/utils/Factory';
import SnapController from 'domain/snap/controller/SnapController';

import RepositoryFactory from '../../domain/adapter/RepositoryFactory';
import snapState from '../../domain/snap/state/snapState';
import WalletController from '../../domain/wallet/controller/WalletController';
import walletState from '../../domain/wallet/state/walletState';

export type IControllerFactory = {
  snapController: SnapController;
  walletController: WalletController;
};

export default Factory<IControllerFactory>({
  snapController: (resolve) =>
    new SnapController(
      snapState,
      resolve.walletController,
      RepositoryFactory.metamaskRepository,
    ),
  walletController: () =>
    new WalletController(walletState, RepositoryFactory.metamaskRepository),
});
