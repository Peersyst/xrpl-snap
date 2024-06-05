import type { Network } from 'common/models/network/network.types';
import type { MetamaskRepository } from '../../../data_access/repository/metamask/MetamaskRepository';
import { withMetamaskRepositoryError } from 'domain/snap/errors/withMetamaskError';
import { DomainEvents } from 'domain/events';

export default class NetworkController {
  constructor(private readonly metamaskRepository: MetamaskRepository) {}

  async getStoredNetworks(): Promise<Network[]> {
    return await this.metamaskRepository.getStoredNetworks();
  }

  async getActiveNetwork(): Promise<Network> {
    return await this.metamaskRepository.getActiveNetwork();
  }

  async changeNetwork(network: Network): Promise<void> {
    const prevNetwork = await this.getActiveNetwork();
    await withMetamaskRepositoryError(async () => {
      await this.metamaskRepository.changeNetwork(network.chainId);
    });
    DomainEvents.network.emit('onNetworkChanged', prevNetwork, network);
  }
}
