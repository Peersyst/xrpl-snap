import { polling } from '@peersyst/react-utils';
import { config } from 'common/config';
import type { SendParams } from 'common/models/transaction/send.types';
import { TransactionsWithMarker, XrplTx } from 'common/models/transaction/tx.types';
import { withRetries } from 'common/query';
import type Amount from 'common/utils/Amount';
import { TransactionMeta } from 'common/utils/xrpl/meta';
import Decimal from 'decimal.js';
import { DomainError } from 'domain/error/DomainError';
import { DomainEvents } from 'domain/events';
import { xrpToDrops, transferRateToDecimal } from 'xrpl';

import type { MetaMaskRepository } from '../../../data-access/repository/metamask/MetaMaskRepository';
import type { XrplService } from '../../../data-access/repository/xrpl/XrplService';
import { TransactionErrorCodes } from '../error/TransactionErrorCodes';
import { PARTIAL_PAYMENT_FLAG } from 'common/constants/flags';

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

    // When a transfer rate is set by the issuer, the sender must pay an extra fee.
    // This is required to ensure the recipient receives the intended amount after the transfer fee is deducted.
    // See: https://xrpl.org/transfer-rate.html and https://github.com/XRPLF/xrpl.js/issues/2122
    if (token.transferRate !== undefined && token.transferRate !== 0 && token.transferRate !== 1000000000) {
      const sendMaxValue = this.computeTransferRate(amount, token.transferRate);

      return await this.metamaskRepository.send({
        ...rest,
        amount: {
          currency: token.currency,
          value: amount,
          issuer: token.issuer,
        },
        sendMax: {
          currency: token.currency,
          value: sendMaxValue,
          issuer: token.issuer,
        },
        flags: PARTIAL_PAYMENT_FLAG,
      });
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

  /**
   * Computes the sendMax value required to cover the issuer's transfer rate fee.
   * This ensures the recipient receives the intended amount after the transfer fee is deducted.
   * See: https://xrpl.org/transfer-rate.html and https://github.com/XRPLF/xrpl.js/issues/2122
   */
  private computeTransferRate(amount: string, transferRate: number): string {
    const feeDecimal = new Decimal(transferRateToDecimal(transferRate));
    const fullRateDecimal = feeDecimal.plus(1);
    return new Decimal(amount).mul(fullRateDecimal).toString(); // keep all significant decimals
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
