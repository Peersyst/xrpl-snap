import { polling } from '@peersyst/react-utils';
import { config } from 'common/config';
import type { SendParams } from 'common/models/transaction/send.types';
import { TransactionsWithMarker, XrplTx } from 'common/models/transaction/tx.types';
import { withRetries } from 'common/query';
import type Amount from 'common/utils/Amount';
import { TransactionMeta } from 'common/utils/xrpl/meta';
import { DomainError } from 'domain/error/DomainError';
import { DomainEvents } from 'domain/events';
import { xrpToDrops, transferRateToDecimal } from 'xrpl';
import Decimal from 'decimal.js';

import type { MetaMaskRepository } from '../../../data-access/repository/metamask/MetaMaskRepository';
import type { XrplService } from '../../../data-access/repository/xrpl/XrplService';
import { TransactionErrorCodes } from '../error/TransactionErrorCodes';

const PARTIAL_PAYMENT_FLAG = 0x00020000;

export default class TransactionController {
  constructor(private readonly metamaskRepository: MetaMaskRepository, private readonly xrplService: XrplService) {}

  async getAccountTransactions(address: string, marker: unknown): Promise<TransactionsWithMarker> {
    try {
      const res = await withRetries(
        async () => this.xrplService.getAccountTransactions(address, marker),
        config.retry.times,
        config.retry.delay,
      );

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
    } catch (error) {
      return {
        marker: undefined,
        transactions: [],
      };
    }
  }

  /**
   * Checks if a transaction is validated
   * @param hash - Hash of the transaction
   */
  public async isTransactionValidated(hash: string): Promise<boolean> {
    try {
      const tx = await this.xrplService.getTransaction(hash);
      const { result } = tx;
      if ('validated' in result) {
        return Boolean(result.validated);
      }
      return false;
    } catch (_) {
      return false;
    }
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
      throw new DomainError(TransactionErrorCodes.INSUFFICIENT_BALANCE);
    }

    return await this.metamaskRepository.send({
      ...rest,
      amount: xrpToDrops(amount),
    });
  }

  async sendIOUTransaction({ amount, token, ...rest }: SendParams): Promise<string> {
  const availableAmount: Amount = token.balance;

  if (!availableAmount.canPay(amount)) {
    throw new DomainError(TransactionErrorCodes.INSUFFICIENT_BALANCE);
  }

  let sendMax;
  let flags;
  // Only apply SendMax if transferRate is set and not default (no fee)
  if (
    token.transferRate !== undefined &&
    token.transferRate !== 0 &&
    token.transferRate !== 1000000000
  ) {
    // Use xrpl.transferRateToDecimal for accurate conversion
    const multiplier = new Decimal(transferRateToDecimal(token.transferRate));
    const sendMaxValue = new Decimal(amount).mul(multiplier).toFixed(15);
    sendMax = {
      currency: token.currency,
      value: sendMaxValue,
      issuer: token.issuer,
    };
    flags = PARTIAL_PAYMENT_FLAG;
  }

  return await this.metamaskRepository.send({
    ...rest,
    amount: {
      currency: token.currency,
      value: amount,
      issuer: token.issuer,
    },
    ...(sendMax && { SendMax: sendMax }),
    ...(flags && { Flags: flags }),
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
