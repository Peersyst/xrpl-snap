import type { Network } from 'common/models/network/network.types';
import type { MetamaskRepository } from '../../../data_access/repository/metamask/MetamaskRepository';
import { withMetamaskRepositoryError } from 'domain/snap/errors/withMetamaskError';

export default class NetworkController {
  constructor(private readonly metamaskRepository: MetamaskRepository) {}

  async getStoredNetworks(): Promise<Network[]> {
    return this.metamaskRepository.getStoredNetworks();
  }

  async getActiveNetwork(): Promise<Network> {
    return this.metamaskRepository.getActiveNetwork();
  }

  async changeNetwork(network: Network): Promise<void> {
    await withMetamaskRepositoryError(async () => {
      await this.metamaskRepository.changeNetwork(network.chainId);
    });
  }
}
