import type { Component } from '@metamask/snaps-sdk';
import type { DIDSet, Transaction } from 'xrpl';

import {
  AccountComponent,
  DataComponent,
  DIDDocumentComponent,
  FeeComponent,
  MemosComponent,
  TransactionTypeComponent,
  URIComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class DIDSetDialogStrategy implements TransactionDialogStrategy<DIDSet> {
  transactionType: Transaction['TransactionType'] = 'DIDSet';

  /**
   * Builds the body of the dialog for a DIDSetDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Data (string)
   * - URI (string)
   * - DIDDocument (string)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: DIDSet): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...DataComponent(transaction.Data),
      ...URIComponent(transaction.URI),
      ...DIDDocumentComponent(transaction.DIDDocument),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
