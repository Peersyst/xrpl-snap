import type { Component } from '@metamask/snaps-sdk';
import type { PaymentChannelClaim, Transaction } from 'xrpl';

import {
  AccountComponent,
  AmountComponent,
  BalanceComponent,
  ChannelComponent,
  FeeComponent,
  MemosComponent,
  PublicKeyComponent,
  SignatureComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class PaymentChannelClaimDialogStrategy implements TransactionDialogStrategy<PaymentChannelClaim> {
  transactionType: Transaction['TransactionType'] = 'PaymentChannelClaim';

  /**
   * Builds the body of the dialog for a PaymentChannelClaim ransaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Channel (string)
   * - Balance (drops)
   * - Amount (drops)
   * - Signature (string)
   * - PublicKey (string)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: PaymentChannelClaim): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...ChannelComponent(transaction.Channel),
      ...BalanceComponent(transaction.Balance),
      ...AmountComponent(transaction.Amount),
      ...SignatureComponent(transaction.Signature),
      ...PublicKeyComponent(transaction.PublicKey),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
