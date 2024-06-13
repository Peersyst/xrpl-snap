import type { Component } from '@metamask/snaps-sdk';
import type { AMMDeposit, Transaction } from 'xrpl';

import {
  AccountComponent,
  Amount2Component,
  AmountComponent,
  Asset2Component,
  AssetComponent,
  EPriceComponent,
  FeeComponent,
  LPTokenOutComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class AMMDepositDialogStrategy implements TransactionDialogStrategy<AMMDeposit> {
  transactionType: Transaction['TransactionType'] = 'AMMDeposit';

  /**
   * Builds the body of the dialog for a AMMDepositDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Asset (Currency)
   * - Asset2 (Currency)
   * - Amount (Amount)
   * - Amount2 (Amount)
   * - EPrice (Amount)
   * - LPTokenOut (IssuedCurrencyAmount)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: AMMDeposit): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...AssetComponent(transaction.Asset),
      ...Asset2Component(transaction.Asset2),
      ...AmountComponent(transaction.Amount),
      ...Amount2Component(transaction.Amount2),
      ...EPriceComponent(transaction.EPrice),
      ...LPTokenOutComponent(transaction.LPTokenOut),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
