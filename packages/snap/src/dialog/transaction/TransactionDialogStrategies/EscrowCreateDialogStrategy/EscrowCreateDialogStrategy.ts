import type { Component } from '@metamask/snaps-sdk';
import type { EscrowCreate, Transaction } from 'xrpl';

import {
  AccountComponent,
  CancelAfterComponent,
  ConditionComponent,
  DestinationComponent,
  DestinationTagComponent,
  FeeComponent,
  FinishAfterComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class EscrowCreateDialogStrategy implements TransactionDialogStrategy<EscrowCreate> {
  transactionType: Transaction['TransactionType'] = 'EscrowCreate';

  /**
   * Builds the body of the dialog for a EscrowCreateDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Destination (string)
   * - CancelAfter (number - XRPTime)
   * - FinishAfter (number - XRPTime)
   * - Condition (string)
   * - DestinationTag (number)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: EscrowCreate): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...DestinationComponent(transaction.Destination),
      ...CancelAfterComponent(transaction.CancelAfter),
      ...FinishAfterComponent(transaction.FinishAfter),
      ...ConditionComponent(transaction.Condition),
      ...DestinationTagComponent(transaction.DestinationTag),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
