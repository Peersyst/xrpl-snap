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
    // Set initial MetaMask installation state
    const hasProvider = Boolean(this.metamaskRepository.provider);
    let isSnapInstalled = false;

    if (hasProvider) {
      // Check if snap is installed without auto-connecting
      try {
        const installedSnaps = await this.metamaskRepository.getSnaps();
        isSnapInstalled = installedSnaps[config.snapOrigin] !== undefined;
      } catch (error) {
        console.error('Failed to check snap installation status:', error);
      }
    }

    this.snapState.setState({
      isMetaMaskInstalled: hasProvider,
      isSnapInstalled,
    });

    // Automatically recover state if MetaMask is available
    if (this.metamaskRepository.provider) {
      try {
        await this.recoverMetaMaskState();
      } catch (error) {
        console.error('Failed to recover MetaMask state:', error);
      }
    }
  }

  async install() {
    // First check if the snap is already installed
    const installedSnaps = await this.metamaskRepository.getSnaps();
    const isSnapInstalled = installedSnaps[config.snapOrigin] !== undefined;

    if (!isSnapInstalled) {
      // Only request snap installation if it's not already installed
      await this.metamaskRepository.requestSnap(config.snapOrigin);
    }
    // Recover state regardless of whether we just installed or it was already installed
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

  async disconnect() {
    try {
      // Get the snap's permission name
      const snaps = await this.metamaskRepository.getSnaps();
      const snapPermission = snaps[config.snapOrigin]?.permissionName;
      if (snapPermission) {
        // Revoke the snap's permissions
        await this.metamaskRepository.provider?.request({
          method: 'wallet_revokePermissions',
          params: {
            permissions: [snapPermission],
          },
        });
      }

      // Update state
      this.snapState.setState({
        isMetaMaskInstalled: true,
        isSnapInstalled: false,
      });
      DomainEvents.snap.emit('onSnapDisconnected');
    } catch (error) {
      console.error('Failed to disconnect snap:', error);
      throw error;
    }
  }
}
