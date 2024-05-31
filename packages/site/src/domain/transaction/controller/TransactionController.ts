import type { MetamaskRepository } from '../../../data_access/repository/metamask/MetamaskRepository';

export default class TransactionController {
  constructor(private readonly metamaskRepository: MetamaskRepository) {}

  async getAccountTransactions(address: string, marker: unknown) {
    return this.metamaskRepository.getAccountTransactions(address, marker);
  }
}
