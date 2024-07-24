import type { Component } from '@metamask/snaps-sdk';
import type { TicketCreate, Transaction } from 'xrpl';

import {
  AccountComponent,
  FeeComponent,
  MemosComponent,
  TicketCountComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class TicketCreateDialogStrategy implements TransactionDialogStrategy<TicketCreate> {
  transactionType: Transaction['TransactionType'] = 'TicketCreate';

  /**
   * Builds the body of the dialog for a TicketCreateDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - TicketCount
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: TicketCreate): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...TicketCountComponent(transaction.TicketCount),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
