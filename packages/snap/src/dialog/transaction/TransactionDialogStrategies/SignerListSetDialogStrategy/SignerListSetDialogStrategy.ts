import type { Component } from '@metamask/snaps-sdk';
import type { SignerListSet, Transaction } from 'xrpl';

import {
  FeeComponent,
  SignerEntriesComponent,
  SignerQuorumComponent,
  AccountComponent,
  TransactionTypeComponent,
  MemosComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class SignerListSetDialogStrategy implements TransactionDialogStrategy<SignerListSet> {
  transactionType: Transaction['TransactionType'] = 'SignerListSet';

  /**
   * Builds the body of the dialog for a SetRegularKeyDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - SignerQuorum
   * - SignerEntries
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: SignerListSet): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...SignerQuorumComponent(transaction.SignerQuorum),
      ...SignerEntriesComponent(transaction.SignerEntries),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
