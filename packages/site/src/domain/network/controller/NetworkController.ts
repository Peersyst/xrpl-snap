import { config } from 'common/config';
import type { Network, NetworkReserve } from 'common/models/network/network.types';
import { DomainEvents } from 'domain/events';
import { handleMetaMaskError } from 'domain/snap/errors/withMetaMaskError';

import type { MetaMaskRepository } from '../../../data-access/repository/metamask/MetaMaskRepository';

export default class NetworkController {
  constructor(private readonly metamaskRepository: MetaMaskRepository) {}

  getNetworkReserve(): NetworkReserve {
    return {
      baseReserveCostInXrp: config.xrplNetwork.baseReserveCostInXrp,
      ownerReserveCostInXrpPerItem: config.xrplNetwork.ownerReserveCostInXrpPerItem,
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
      DomainEvents.network.emit('onNetworkChanged', prevNetwork, network);
    } catch (error) {
      handleMetaMaskError(error);
    }
  }
}
