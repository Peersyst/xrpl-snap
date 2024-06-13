import type { Component } from '@metamask/snaps-sdk';
import type { Transaction, OfferCancel } from 'xrpl';

import {
  AccountComponent,
  FeeComponent,
  OfferSequenceComponent,
  TransactionTypeComponent,
} from '../TransactionComponents/TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class OfferCancelDialogStrategy implements TransactionDialogStrategy<OfferCancel> {
  transactionType: Transaction['TransactionType'] = 'OfferCancel';

  /**
   * Builds the body of the dialog for a OfferCancelDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - OfferSequence (number)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: OfferCancel): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...OfferSequenceComponent(transaction.OfferSequence),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
