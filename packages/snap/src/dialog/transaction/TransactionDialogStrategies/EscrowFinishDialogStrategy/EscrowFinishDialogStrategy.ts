import type { Component } from '@metamask/snaps-sdk';
import type { EscrowFinish, Transaction } from 'xrpl';

import {
  AccountComponent,
  ConditionComponent,
  FeeComponent,
  FulfillmentComponent,
  OfferSequenceComponent,
  OwnerComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class EscrowFinishDialogStrategy implements TransactionDialogStrategy<EscrowFinish> {
  transactionType: Transaction['TransactionType'] = 'EscrowFinish';

  /**
   * Builds the body of the dialog for a EscrowFinishDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Owner (string)
   * - OfferSequence (number | string)
   * - Condition (string)
   * - Fulfillment (string)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: EscrowFinish): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...OwnerComponent(transaction.Owner),
      ...OfferSequenceComponent(transaction.OfferSequence),
      ...ConditionComponent(transaction.Condition),
      ...FulfillmentComponent(transaction.Fulfillment),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
