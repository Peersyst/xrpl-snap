import { polling } from '@peersyst/react-utils';
import type { SendParams } from 'common/models/transaction/send.types';
import type Amount from 'common/utils/Amount';
import { convertCurrencyCode, parseCurrencyCode } from 'common/utils/token/currencyCode';
import { DomainError } from 'domain/error/DomainError';
import { DomainEvents } from 'domain/events';
import { xrpToDrops, type Payment } from 'xrpl';
import type { ResponseOnlyTxInfo } from 'xrpl';

import type { MetamaskRepository } from '../../../data-access/repository/metamask/MetamaskRepository';
import { TransactionErrorCodes } from '../error/TransactionErrorCodes';

export type TransactionsWithMarker = {
  transactions: (Payment & ResponseOnlyTxInfo)[];
  marker: unknown;
};

export default class TransactionController {
  constructor(private readonly metamaskRepository: MetamaskRepository) {}

  async getAccountTransactions(address: string, marker: unknown): Promise<TransactionsWithMarker> {
    const res = await this.metamaskRepository.getAccountTransactions(address, marker);

    const payments = res.result.transactions.reduce<(Payment & ResponseOnlyTxInfo)[]>((acc, { tx, meta }) => {
      // eslint-disable-next-line no-implicit-coercion
      if (!!tx && tx.TransactionType === 'Payment' && typeof meta === 'object' && meta.TransactionResult === 'tesSUCCESS') {
        if (typeof tx.Amount === 'string') {
          acc.push(tx);
        } else {
          const currencyCode = parseCurrencyCode(tx.Amount.currency);
          acc.push({ ...tx, Amount: { ...tx.Amount, currency: currencyCode } });
        }
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

  async sendXrpTransaction(params: SendParams): Promise<string> {
    const availableAmount: Amount = params.token.balance;

    if (!availableAmount.canPay(params.amount)) {
      throw new DomainError(TransactionErrorCodes.INSUCCICIENT_BALANCE);
    }

    return await this.metamaskRepository.send({
      ...params,
      amount: xrpToDrops(params.amount),
    });
  }

  async sendIOUTransaction({ amount, destination, token }: SendParams): Promise<string> {
    const availableAmount: Amount = token.balance;

    if (!availableAmount.canPay(amount)) {
      throw new DomainError(TransactionErrorCodes.INSUCCICIENT_BALANCE);
    }

    return await this.metamaskRepository.send({
      destination,
      amount: {
        currency: convertCurrencyCode(token.currency),
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
