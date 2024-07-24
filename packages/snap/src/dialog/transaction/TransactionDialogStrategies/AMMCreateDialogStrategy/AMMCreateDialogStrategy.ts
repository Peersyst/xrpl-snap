import type { Component } from '@metamask/snaps-sdk';
import type { AMMCreate, Transaction } from 'xrpl';

import {
  AccountComponent,
  Amount2Component,
  AmountComponent,
  FeeComponent,
  TransactionTypeComponent,
  TradingFeeComponent,
  MemosComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class AMMCreateDialogStrategy implements TransactionDialogStrategy<AMMCreate> {
  transactionType: Transaction['TransactionType'] = 'AMMCreate';

  /**
   * Builds the body of the dialog for a AMMCreateDialogStrategy transaction.
   * Supported fields:
   * - TransactionType (string)
   * - Account (string)
   * - Amount (Amount)
   * - Amount2 (Amount)
   * - TradingFee (number)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: AMMCreate): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...AmountComponent(transaction.Amount),
      ...Amount2Component(transaction.Amount2),
      ...TradingFeeComponent(transaction.TradingFee),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
