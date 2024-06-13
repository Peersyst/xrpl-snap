import type { Component } from '@metamask/snaps-sdk';
import type { NFTokenCreateOffer, Transaction } from 'xrpl';

import {
  AccountComponent,
  AmountComponent,
  DestinationComponent,
  ExpirationComponent,
  FeeComponent,
  NFTokenIDComponent,
  OwnerComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class NFTokenCreateOfferDialogStrategy implements TransactionDialogStrategy<NFTokenCreateOffer> {
  transactionType: Transaction['TransactionType'] = 'NFTokenCreateOffer';

  /**
   * Builds the body of the dialog for a NFTokenCreateOfferDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - NFTokenID (string)
   * - Amount (string)
   * - Owner (string)
   * - Expiration (number - XRPTime)
   * - Destination (string)
   * - Fee XRPAmount
   * TODO(jordi) Missing fields:
   * - Flags
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: NFTokenCreateOffer): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...NFTokenIDComponent(transaction.NFTokenID),
      ...AmountComponent(transaction.Amount),
      ...OwnerComponent(transaction.Owner),
      ...ExpirationComponent(transaction.Expiration),
      ...DestinationComponent(transaction.Destination),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
