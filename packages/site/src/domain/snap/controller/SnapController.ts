import { DomainEvents } from 'domain/events';
import NetworkController from 'domain/network/controller/NetworkController';

import { config } from '../../../common/config';
import type { MetaMaskRepository } from '../../../data-access/repository/metamask/MetaMaskRepository';
import type State from '../../common/State';
import type { ISnapState } from '../state/snapState';

export default class SnapController {
  constructor(
    public readonly snapState: State<ISnapState>,
    private readonly metamaskRepository: MetaMaskRepository,
    private readonly networkController: NetworkController,
  ) {}

  async onInit(): Promise<void> {
    try {
      await this.recoverMetaMaskState();
    } catch (_) {}
  }

  async install() {
    await this.metamaskRepository.requestSnap(config.snapOrigin);
    await this.recoverMetaMaskState();
  }

  async recoverMetaMaskState() {
    if (!this.metamaskRepository.provider) {
      return;
    }
    const installedSnaps = await this.metamaskRepository.getSnaps();

    const isSnapInstalled = installedSnaps[config.snapOrigin] !== undefined;

    if (isSnapInstalled) {
      await this.networkController.load();
    }

    this.snapState.setState({
      isMetaMaskInstalled: true,
      isSnapInstalled,
    });
    if (isSnapInstalled) {
      DomainEvents.snap.emit('onSpanInitialized');
    }
  }

  disconnect() {
    this.snapState.setState({
      isMetaMaskInstalled: true,
      isSnapInstalled: false,
    });
    DomainEvents.snap.emit('onSnapDisconnected');
  }
}
