import type { Component } from '@metamask/snaps-sdk';
import type { Clawback, Transaction } from 'xrpl';

import { AccountComponent, AmountComponent, FeeComponent, TransactionTypeComponent } from '../TransactionComponents/TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class ClawbackDialogStrategy implements TransactionDialogStrategy<Clawback> {
  transactionType: Transaction['TransactionType'] = 'Clawback';

  /**
   * Builds the body of the dialog for a ClawbackDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account (string)
   * - Amount (IssuedCurreencyAmount)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: Clawback): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...AmountComponent(transaction.Amount),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
