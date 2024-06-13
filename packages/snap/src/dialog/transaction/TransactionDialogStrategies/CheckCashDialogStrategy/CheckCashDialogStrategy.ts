import type { Component } from '@metamask/snaps-sdk';
import type { CheckCash, Transaction } from 'xrpl';

import {
  AccountComponent,
  AmountComponent,
  CheckIDComponent,
  DeliverMinComponent,
  FeeComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class CheckCashDialogStrategy implements TransactionDialogStrategy<CheckCash> {
  transactionType: Transaction['TransactionType'] = 'CheckCash';

  /**
   * Builds the body of the dialog for a CheckCashDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - CheckID (string)
   * - Amount (Amount)
   * - DeliverMin (Amount)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: CheckCash): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...CheckIDComponent(transaction.CheckID),
      ...AmountComponent(transaction.Amount),
      ...DeliverMinComponent(transaction.DeliverMin),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
