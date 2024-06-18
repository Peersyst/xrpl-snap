import type { Component } from '@metamask/snaps-sdk';
import type { DepositPreauth, Transaction } from 'xrpl';

import {
  AccountComponent,
  AuthorizeComponent,
  FeeComponent,
  TransactionTypeComponent,
  UnauthorizeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class DepositPreauthDialogStrategy implements TransactionDialogStrategy<DepositPreauth> {
  transactionType: Transaction['TransactionType'] = 'DepositPreauth';

  /**
   * Builds the body of the dialog for a DepositPreauthDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Authorize (string)
   * - Unauthorize (string)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: DepositPreauth): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...AuthorizeComponent(transaction.Authorize),
      ...UnauthorizeComponent(transaction.Unauthorize),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
