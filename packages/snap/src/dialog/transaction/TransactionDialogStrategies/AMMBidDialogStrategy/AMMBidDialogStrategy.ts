import type { Component } from '@metamask/snaps-sdk';
import type { AMMBid, Transaction } from 'xrpl';

import {
  Asset2Component,
  AssetComponent,
  AuthAccountsComponent,
  BidMaxComponent,
  BidMinComponent,
  AccountComponent,
  FeeComponent,
  TransactionTypeComponent,
  MemosComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class AMMBidDialogStrategy implements TransactionDialogStrategy<AMMBid> {
  transactionType: Transaction['TransactionType'] = 'AMMBid';

  /**
   * Builds the body of the dialog for a AMMBidDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Asset (Currency)
   * - Asset2 (Currency)
   * - BidMin (Amount)
   * - BidMax (Amount)
   * - AuthAccounts[] (AuthAccount[])
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: AMMBid): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...AssetComponent(transaction.Asset),
      ...Asset2Component(transaction.Asset2),
      ...BidMinComponent(transaction.BidMin),
      ...BidMaxComponent(transaction.BidMax),
      ...AuthAccountsComponent(transaction.AuthAccounts),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
