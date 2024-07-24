import type { Component } from '@metamask/snaps-sdk';
import type { TrustSet, Transaction } from 'xrpl';

import {
  AccountComponent,
  FeeComponent,
  LimitAmountComponent,
  MemosComponent,
  QualityInComponent,
  QualityOutComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class TrustSetDialogStrategy implements TransactionDialogStrategy<TrustSet> {
  transactionType: Transaction['TransactionType'] = 'TrustSet';

  /**
   * Supported fields:
   * - TransactionType
   * - Account
   * - LimitAmount (IssuedCurrencyAmount)
   * - QualityIn (number)
   * - QualityOut (number)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * TODO: Add more fields
   * - Flags
   *
   * @description Builds the body of the dialog for a TrustSetDialogStrategy transaction.
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: TrustSet): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...LimitAmountComponent(transaction.LimitAmount),
      ...QualityInComponent(transaction.QualityIn),
      ...QualityOutComponent(transaction.QualityOut),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
