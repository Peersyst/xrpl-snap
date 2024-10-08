import type { Component } from '@metamask/snaps-sdk';
import type { Transaction, OfferCancel } from 'xrpl';

import {
  AccountComponent,
  FeeComponent,
  MemosComponent,
  OfferSequenceComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class OfferCancelDialogStrategy implements TransactionDialogStrategy<OfferCancel> {
  transactionType: Transaction['TransactionType'] = 'OfferCancel';

  /**
   * Builds the body of the dialog for a OfferCancelDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - OfferSequence (number)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: OfferCancel): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...OfferSequenceComponent(transaction.OfferSequence),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
