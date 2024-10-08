import type { Component } from '@metamask/snaps-sdk';
import type { Clawback, Transaction } from 'xrpl';

import { AccountComponent, AmountComponent, FeeComponent, MemosComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class ClawbackDialogStrategy implements TransactionDialogStrategy<Clawback> {
  transactionType: Transaction['TransactionType'] = 'Clawback';

  /**
   * Builds the body of the dialog for a ClawbackDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account (string)
   * - Amount (IssuedCurreencyAmount)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: Clawback): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...AmountComponent(transaction.Amount),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
