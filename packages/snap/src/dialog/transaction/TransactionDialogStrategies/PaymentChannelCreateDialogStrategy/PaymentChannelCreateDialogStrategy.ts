import type { Component } from '@metamask/snaps-sdk';
import type { PaymentChannelCreate, Transaction } from 'xrpl';

import {
  AccountComponent,
  AmountComponent,
  CancelAfterComponent,
  DestinationComponent,
  DestinationTagComponent,
  FeeComponent,
  MemosComponent,
  PublicKeyComponent,
  SettleDelayComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class PaymentChannelCreateDialogStrategy implements TransactionDialogStrategy<PaymentChannelCreate> {
  transactionType: Transaction['TransactionType'] = 'PaymentChannelCreate';

  /**
   * Builds the body of the dialog for a PaymentChannelCreate ransaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Amount (drops)
   * - Destination (string)
   * - SettleDelay (number)
   * - PublicKey (string)
   * - CancelAfter (number - xrpl timestamp)
   * - DestinationTag (number)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: PaymentChannelCreate): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...AmountComponent(transaction.Amount),
      ...DestinationComponent(transaction.Destination),
      ...SettleDelayComponent(transaction.SettleDelay),
      ...PublicKeyComponent(transaction.PublicKey),
      ...CancelAfterComponent(transaction.CancelAfter),
      ...DestinationTagComponent(transaction.DestinationTag),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
