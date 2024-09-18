import Factory from 'common/utils/Factory';
import NetworkController from 'domain/network/controller/NetworkController';
import SnapController from 'domain/snap/controller/SnapController';
import { TokenController } from 'domain/token/TokenController';

import RepositoryFactory from '../../domain/adapter/RepositoryFactory';
import { NftController } from '../../domain/nft/controller/NftController';
import snapState from '../../domain/snap/state/snapState';
import TransactionController from '../../domain/transaction/controller/TransactionController';
import WalletController from '../../domain/wallet/controller/WalletController';
import walletState from '../../domain/wallet/state/walletState';

export type IControllerFactory = {
  snapController: SnapController;
  walletController: WalletController;
  networkController: NetworkController;
  transactionController: TransactionController;
  tokenController: TokenController;
  nftController: NftController;
};

export default Factory<IControllerFactory>({
  snapController: () => new SnapController(snapState, RepositoryFactory.metamaskRepository),
  walletController: (resolve) =>
    new WalletController(
      walletState,
      resolve.networkController,
      resolve.transactionController,
      RepositoryFactory.metamaskRepository,
      RepositoryFactory.fundRepository,
    ),
  networkController: () => new NetworkController(RepositoryFactory.metamaskRepository),
  transactionController: () => new TransactionController(RepositoryFactory.metamaskRepository),
  tokenController: () => new TokenController(RepositoryFactory.tokenRepository),
  nftController: () => new NftController(RepositoryFactory.metamaskRepository),
});
