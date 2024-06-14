import type { Component } from '@metamask/snaps-sdk';
import type { EscrowCancel, Transaction } from 'xrpl';

import {
  AccountComponent,
  FeeComponent,
  OfferSequenceComponent,
  OwnerComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class EscrowCancelDialogStrategy implements TransactionDialogStrategy<EscrowCancel> {
  transactionType: Transaction['TransactionType'] = 'EscrowCancel';

  /**
   * Builds the body of the dialog for a EscrowCancelDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Owner
   * - OfferSequence
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: EscrowCancel): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...OwnerComponent(transaction.Owner),
      ...OfferSequenceComponent(transaction.OfferSequence),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
