import type { Component } from '@metamask/snaps-sdk';
import type { AMMVote, Transaction } from 'xrpl';

import {
  AccountComponent,
  Asset2Component,
  AssetComponent,
  FeeComponent,
  MemosComponent,
  TradingFeeComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class AMMVoteDialogStrategy implements TransactionDialogStrategy<AMMVote> {
  transactionType: Transaction['TransactionType'] = 'AMMVote';

  /**
   * Builds the body of the dialog for a AMMVoteDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Asset (Currency)
   * - Asset2 (Currency)
   * - TradingFee (number)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: AMMVote): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...AssetComponent(transaction.Asset),
      ...Asset2Component(transaction.Asset2),
      ...TradingFeeComponent(transaction.TradingFee),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
