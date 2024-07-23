import type { Component } from '@metamask/snaps-sdk';
import type { CheckCancel, Transaction } from 'xrpl';

import { AccountComponent, CheckIDComponent, FeeComponent, MemosComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class CheckCancelDialogStrategy implements TransactionDialogStrategy<CheckCancel> {
  transactionType: Transaction['TransactionType'] = 'CheckCancel';

  /**
   * Builds the body of the dialog for a CheckCancelDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - CheckID
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: CheckCancel): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...CheckIDComponent(transaction.CheckID),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
