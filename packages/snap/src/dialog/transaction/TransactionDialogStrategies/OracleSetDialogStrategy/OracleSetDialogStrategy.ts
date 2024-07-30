import type { Component } from '@metamask/snaps-sdk';
import type { Transaction, OracleSet } from 'xrpl';

import { AccountComponent, FeeComponent, MemosComponent, TransactionTypeComponent, URIComponent } from '../../TransactionComponents';
import {
  AssetClassComponent,
  LastUpdateTimeComponent,
  OracleDocumentIDComponent,
  PriceDataSeriesComponment,
  ProviderComponent,
} from '../../TransactionComponents/oracle/oracle';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class OracleSetDialogStrategy implements TransactionDialogStrategy<OracleSet> {
  transactionType: Transaction['TransactionType'] = 'OracleSet';

  /**
   * Builds the body of the dialog for a OracleSetDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - OracleDocumentID (number)
   * - LastUpdateTime (number)
   * - PriceDataSeries (PriceData[])
   * - Provider
   * - URI
   * - AssetClass
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: OracleSet): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...OracleDocumentIDComponent(transaction.OracleDocumentID),
      ...LastUpdateTimeComponent(transaction.LastUpdateTime),
      ...PriceDataSeriesComponment(transaction.PriceDataSeries),
      ...ProviderComponent(transaction.Provider),
      ...URIComponent(transaction.URI),
      ...AssetClassComponent(transaction.AssetClass),
      ...MemosComponent(transaction.Memos),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
