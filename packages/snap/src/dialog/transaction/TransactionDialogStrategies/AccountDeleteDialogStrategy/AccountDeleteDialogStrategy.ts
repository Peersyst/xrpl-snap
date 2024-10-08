import type { Component } from '@metamask/snaps-sdk';
import type { AccountDelete, Transaction } from 'xrpl';

import {
  AccountComponent,
  DestinationComponent,
  DestinationTagComponent,
  FeeComponent,
  TransactionTypeComponent,
  MemosComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class AccountDeleteDialogStrategy implements TransactionDialogStrategy<AccountDelete> {
  transactionType: Transaction['TransactionType'] = 'AccountDelete';

  /**
   * Builds the body of the dialog for a AccountDelete transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Destination
   * - DestinationTag
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param AccountDelete
   * @returns Components to render in the dialog
   */
  buildBody(AccountDelete: AccountDelete): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(AccountDelete.Account),
      ...DestinationComponent(AccountDelete.Destination),
      ...DestinationTagComponent(AccountDelete.DestinationTag),
      ...MemosComponent(AccountDelete.Memos),
      ...FeeComponent(AccountDelete.Fee),
    ];
  }
}
