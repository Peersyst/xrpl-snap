import type { Component } from '@metamask/snaps-sdk';
import type { NFTokenCancelOffer, Transaction } from 'xrpl';

import {
  AccountComponent,
  FeeComponent,
  MemosComponent,
  NFTokenOffersComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class NFTokenCancelOfferDialogStrategy implements TransactionDialogStrategy<NFTokenCancelOffer> {
  transactionType: Transaction['TransactionType'] = 'NFTokenCancelOffer';

  /**
   * Builds the body of the dialog for a NFTokenCancelOfferDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - NFTokenOffers (string[])
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: NFTokenCancelOffer): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...NFTokenOffersComponent(transaction.NFTokenOffers),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
