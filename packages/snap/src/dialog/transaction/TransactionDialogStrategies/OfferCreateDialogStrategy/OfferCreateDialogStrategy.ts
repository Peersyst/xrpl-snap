import type { Component } from '@metamask/snaps-sdk';
import type { Transaction, OfferCreate } from 'xrpl';

import {
  AccountComponent,
  ExpirationComponent,
  FeeComponent,
  MemosComponent,
  OfferSequenceComponent,
  TakerGetsComponent,
  TakerPaysComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class OfferCreateDialogStrategy implements TransactionDialogStrategy<OfferCreate> {
  transactionType: Transaction['TransactionType'] = 'OfferCreate';

  /**
   * Builds the body of the dialog for a OfferCreateDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Expiration (number)
   * - OfferSequence (number)
   * - TakerGets (Amount)
   * - TakerPays (Amount)
   * - Fee (drops)
   * - Memos (Memo[])
   * TODO(jordi) Missing fields:
   * - Flags
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: OfferCreate): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...TakerGetsComponent(transaction.TakerGets),
      ...TakerPaysComponent(transaction.TakerPays),
      ...OfferSequenceComponent(transaction.OfferSequence),
      ...ExpirationComponent(transaction.Expiration),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
