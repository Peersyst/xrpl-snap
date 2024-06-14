import type { Component } from '@metamask/snaps-sdk';
import type { CheckCreate, Transaction } from 'xrpl';

import {
  AccountComponent,
  DestinationComponent,
  DestinationTagComponent,
  ExpirationComponent,
  FeeComponent,
  InvoiceIDComponent,
  SendMaxComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class CheckCreateDialogStrategy implements TransactionDialogStrategy<CheckCreate> {
  transactionType: Transaction['TransactionType'] = 'CheckCreate';

  /**
   * Builds the body of the dialog for a CheckCreateDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Destination (string)
   * - SendMax (Amount)
   * - Expiration (number)
   * - DestinationTag (number)
   * - InvoiceID (string)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: CheckCreate): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...DestinationComponent(transaction.Destination),
      ...SendMaxComponent(transaction.SendMax),
      ...ExpirationComponent(transaction.Expiration),
      ...DestinationTagComponent(transaction.DestinationTag),
      ...InvoiceIDComponent(transaction.InvoiceID),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
