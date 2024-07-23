import type { Component } from '@metamask/snaps-sdk';
import type { PaymentChannelFund, Transaction } from 'xrpl';

import {
  AccountComponent,
  AmountComponent,
  ChannelComponent,
  ExpirationComponent,
  FeeComponent,
  MemosComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class PaymentChannelFundDialogStrategy implements TransactionDialogStrategy<PaymentChannelFund> {
  transactionType: Transaction['TransactionType'] = 'PaymentChannelFund';

  /**
   * Builds the body of the dialog for a PaymentChannelFund ransaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Channel (string)
   * - Amount (drops)
   * - Expiration (number - xrpl timestamp)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: PaymentChannelFund): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...ChannelComponent(transaction.Channel),
      ...AmountComponent(transaction.Amount),
      ...ExpirationComponent(transaction.Expiration),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
