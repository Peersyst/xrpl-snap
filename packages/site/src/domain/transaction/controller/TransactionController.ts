import { xrpToDrops, type Payment } from 'xrpl';
import type { ResponseOnlyTxInfo } from 'xrpl/src/models/common';
import type { MetamaskRepository } from '../../../data_access/repository/metamask/MetamaskRepository';
import { SendParams } from 'common/models/transaction/send.types';
import { polling } from '@peersyst/react-utils';
import { DomainEvents } from 'domain/events';

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

  /**
   * Checks if a transaction is validated
   * @param hash Hash of the transaction
   */
  public async isTransactionValidated(hash: string): Promise<boolean> {
    const tx = await this.metamaskRepository.getTransaction(hash);
    const result = tx.result;
    if ('validated' in result) {
      return !!result.validated;
    } else {
      return false;
    }
  }

  /**
   * Await for a transaction to be validated
   * @param hash Hash of the transaction
   */
  public async awaitTransactionValidation(hash: string): Promise<void> {
    await polling(
      () => this.isTransactionValidated(hash),
      (res) => !res,
      {
        maxIterations: 10,
        delay: 2000,
      },
    );
  }

  async sendTransaction(params: SendParams): Promise<string> {
    const hash = await this.metamaskRepository.send({
      ...params,
      amount: xrpToDrops(params.amount),
    });
    DomainEvents.transaction.emit('onTransactionSigned');

    await this.awaitTransactionValidation(hash);

    return hash;
  }
}
