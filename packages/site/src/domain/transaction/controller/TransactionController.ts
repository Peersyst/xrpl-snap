import { polling } from '@peersyst/react-utils';
import type { SendParams } from 'common/models/transaction/send.types';
import { TransactionsWithMarker, XrplTx } from 'common/models/transaction/tx.types';
import type Amount from 'common/utils/Amount';
import { TransactionMeta } from 'common/utils/xrpl/meta';
import { DomainError } from 'domain/error/DomainError';
import { DomainEvents } from 'domain/events';
import { xrpToDrops } from 'xrpl';

import type { MetamaskRepository } from '../../../data-access/repository/metamask/MetamaskRepository';
import { TransactionErrorCodes } from '../error/TransactionErrorCodes';

export default class TransactionController {
  constructor(private readonly metamaskRepository: MetamaskRepository) {}

  async getAccountTransactions(address: string, marker: unknown): Promise<TransactionsWithMarker> {
    const res = await this.metamaskRepository.getAccountTransactions(address, marker);

    const payments = res.result.transactions.reduce<XrplTx[]>((acc, { tx, meta }) => {
      // eslint-disable-next-line no-implicit-coercion
      if (tx && typeof meta === 'object' && meta.TransactionResult === 'tesSUCCESS') {
        acc.push({ ...tx, meta: new TransactionMeta(meta) });
      }

      return acc;
    }, []);

    return {
      marker: res.result.marker,
      transactions: payments,
    };
  }

  /**
   * Checks if a transaction is validated
   * @param hash - Hash of the transaction
   */
  public async isTransactionValidated(hash: string): Promise<boolean> {
    const tx = await this.metamaskRepository.getTransaction(hash);
    const { result } = tx;
    if ('validated' in result) {
      return Boolean(result.validated);
    }
    return false;
  }

  /**
   * Await for a transaction to be validated
   * @param hash - Hash of the transaction
   */
  public async awaitTransactionValidation(hash: string): Promise<void> {
    await polling(
      async () => this.isTransactionValidated(hash),
      (res) => !res,
      {
        maxIterations: 15,
        delay: 2000,
      },
    );
  }

  async sendXrpTransaction({ token, amount, ...rest }: SendParams): Promise<string> {
    const availableAmount: Amount = token.balance;

    if (!availableAmount.canPay(amount)) {
      throw new DomainError(TransactionErrorCodes.INSUCCICIENT_BALANCE);
    }

    return await this.metamaskRepository.send({
      ...rest,
      amount: xrpToDrops(amount),
    });
  }

  async sendIOUTransaction({ amount, token, ...rest }: SendParams): Promise<string> {
    const availableAmount: Amount = token.balance;

    if (!availableAmount.canPay(amount)) {
      throw new DomainError(TransactionErrorCodes.INSUCCICIENT_BALANCE);
    }

    return await this.metamaskRepository.send({
      ...rest,
      amount: {
        currency: token.currency,
        value: amount,
        issuer: token.issuer,
      },
    });
  }

  async sendTransaction(params: SendParams): Promise<string> {
    const { token } = params;
    let hash = '';

    if (token.currency === 'XRP') {
      hash = await this.sendXrpTransaction(params);
    } else {
      hash = await this.sendIOUTransaction(params);
    }

    DomainEvents.transaction.emit('onTransactionSigned');
    await this.awaitTransactionValidation(hash);

    return hash;
  }
}
