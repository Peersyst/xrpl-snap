import type { Component } from '@metamask/snaps-sdk';
import type { AMMDelete, Transaction } from 'xrpl';

import {
  AccountComponent,
  Asset2Component,
  AssetComponent,
  FeeComponent,
  MemosComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class AMMDeleteDialogStrategy implements TransactionDialogStrategy<AMMDelete> {
  transactionType: Transaction['TransactionType'] = 'AMMDelete';

  /**
   * Builds the body of the dialog for a AMMDeleteDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Asset (Currency)
   * - Asset2 (Currency)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: AMMDelete): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...AssetComponent(transaction.Asset),
      ...Asset2Component(transaction.Asset2),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
