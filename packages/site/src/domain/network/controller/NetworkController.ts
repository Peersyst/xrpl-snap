import { config } from 'common/config';
import { NetworkChainId, type Network, type NetworkReserve } from 'common/models/network/network.types';
import { withRetries } from 'common/query';
import { DomainEvents } from 'domain/events';
import { handleMetaMaskError } from 'domain/snap/errors/withMetaMaskError';

import type { MetaMaskRepository } from '../../../data-access/repository/metamask/MetaMaskRepository';
import { XrplService } from '../../../data-access/repository/xrpl/XrplService';

export default class NetworkController {
  private baseReserveCostInXrp: string;

  private ownerReserveCostInXrpPerItem: string;

  constructor(private readonly metamaskRepository: MetaMaskRepository, private readonly xrplService: XrplService) {}

  async load(): Promise<void> {
    const { chainId } = await this.getActiveNetwork();
    let node: string;
    switch (chainId) {
      case NetworkChainId.DEVNET:
        node = config.nodeUrls.devnet;
        break;
      case NetworkChainId.TESTNET:
        node = config.nodeUrls.testnet;
        break;
      default:
        node = config.nodeUrls.mainnet;
        break;
    }

    await withRetries(async () => this.xrplService.load(node), config.retry.times, config.retry.delay);

    const { baseReserve, ownerReserve } = await this.xrplService.getNetworkReserve();
    this.baseReserveCostInXrp = String(baseReserve);
    this.ownerReserveCostInXrpPerItem = String(ownerReserve);
  }

  getNetworkReserve(): NetworkReserve {
    return {
      baseReserveCostInXrp: this.baseReserveCostInXrp,
      ownerReserveCostInXrpPerItem: this.ownerReserveCostInXrpPerItem,
    } as const;
  }

  async getStoredNetworks(): Promise<Network[]> {
    return await this.metamaskRepository.getStoredNetworks();
  }

  async getActiveNetwork(): Promise<Network> {
    return await this.metamaskRepository.getActiveNetwork();
  }

  async changeNetwork(network: Network): Promise<void> {
    const prevNetwork = await this.getActiveNetwork();
    try {
      await this.metamaskRepository.changeNetwork(network.chainId);
      await this.load();
      DomainEvents.network.emit('onNetworkChanged', prevNetwork, network);
    } catch (error) {
      handleMetaMaskError(error);
    }
  }
}
