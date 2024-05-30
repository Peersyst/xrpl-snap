import { config } from '../../../common/config';
import type { MetamaskRepository } from '../../../data_access/repository/metamask/MetamaskRepository';
import type State from '../../common/State';
import type { ISnapState } from '../state/snapState';
import WalletController from '../../wallet/controller/WalletController';

export default class SnapController {
  constructor(
    public readonly snapState: State<ISnapState>,
    private readonly walletController: WalletController,
    private readonly metamaskRepository: MetamaskRepository,
  ) {}

  async onInit(): Promise<void> {
    await this.recoverMetamaskState();
  }

  async install() {
    await this.metamaskRepository.requestSnap(config.snapOrigin);
  }

  async recoverMetamaskState() {
    if (!this.metamaskRepository.provider) {
      this.snapState.setState({
        isMetamaskInstalled: false,
        isSnapInstalled: false,
      });
      return;
    }
    const installedSnaps = await this.metamaskRepository.getSnaps();
    this.snapState.setState({
      isMetamaskInstalled: true,
      isSnapInstalled: installedSnaps[config.snapOrigin] !== undefined,
    });
    await this.walletController.loadWallet();
  }
}
