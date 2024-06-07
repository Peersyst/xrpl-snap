import type {
  Network,
  NetworkReserve,
} from 'common/models/network/network.types';
import type { MetamaskRepository } from '../../../data_access/repository/metamask/MetamaskRepository';
import { handleMetamaskError } from 'domain/snap/errors/withMetamaskError';
import { DomainEvents } from 'domain/events';
import { config } from 'common/config';

export default class NetworkController {
  constructor(private readonly metamaskRepository: MetamaskRepository) {}

  getNetworkReserve(): NetworkReserve {
    return {
      baseReserveCostInXrp: config.xrplNetwork.baseReserveCostInXrp,
      ownerReserveCostInXrpPerItem:
        config.xrplNetwork.ownerReserveCostInXrpPerItem,
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
      handleMetamaskError(error);
    }
  }
}
