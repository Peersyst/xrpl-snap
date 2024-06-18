import type { Component } from '@metamask/snaps-sdk';
import type { AMMWithdraw, Transaction } from 'xrpl';

import {
  AccountComponent,
  Amount2Component,
  AmountComponent,
  Asset2Component,
  AssetComponent,
  EPriceComponent,
  FeeComponent,
  LPTokenInComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class AMMWithdrawDialogStrategy implements TransactionDialogStrategy<AMMWithdraw> {
  transactionType: Transaction['TransactionType'] = 'AMMWithdraw';

  /**
   * Builds the body of the dialog for a AMMWithdrawDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Asset (Currency)
   * - Asset2 (Currency)
   * - Amount (Amount)
   * - Amount2 (Amount)
   * - EPrice (Amount)
   * - LPTokenIn (IssuedCurrencyAmount)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: AMMWithdraw): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...AssetComponent(transaction.Asset),
      ...Asset2Component(transaction.Asset2),
      ...AmountComponent(transaction.Amount),
      ...Amount2Component(transaction.Amount2),
      ...EPriceComponent(transaction.EPrice),
      ...LPTokenInComponent(transaction.LPTokenIn),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
