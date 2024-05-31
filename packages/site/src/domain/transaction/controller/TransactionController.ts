import type { Payment } from 'xrpl';
import type { ResponseOnlyTxInfo } from 'xrpl/src/models/common';

import type { MetamaskRepository } from '../../../data_access/repository/metamask/MetamaskRepository';

export type TransactionsWithMarker = {
  transactions: (Payment & ResponseOnlyTxInfo)[];
  marker: unknown;
};

export default class TransactionController {
  constructor(private readonly metamaskRepository: MetamaskRepository) {}

  async getAccountTransactions(
    address: string,
    marker: unknown,
  ): Promise<TransactionsWithMarker> {
    const res = await this.metamaskRepository.getAccountTransactions(
      address,
      marker,
    );
    return {
      marker: res.result.marker,
      transactions: res.result.transactions
        .map((accountTx) => accountTx.tx)
        .filter((tx) => tx?.TransactionType === 'Payment') as (Payment &
        ResponseOnlyTxInfo)[],
    };
  }
}
