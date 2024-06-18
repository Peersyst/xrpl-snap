import type { Component } from '@metamask/snaps-sdk';
import type { NFTokenMint, Transaction } from 'xrpl';

import {
  AccountComponent,
  FeeComponent,
  NFTokenTaxonComponent,
  IssuerComponent,
  TransactionTypeComponent,
  TransferFeeComponent,
  URIComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class NFTokenMintDialogStrategy implements TransactionDialogStrategy<NFTokenMint> {
  transactionType: Transaction['TransactionType'] = 'NFTokenMint';

  /**
   * Builds the body of the dialog for a NFTokenMintDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - NFTokenTaxon (number)
   * - Issuer (string)
   * - TransferFee (number)
   * - URI (string)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: NFTokenMint): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...NFTokenTaxonComponent(transaction.NFTokenTaxon),
      ...IssuerComponent(transaction.Issuer),
      ...TransferFeeComponent(transaction.TransferFee),
      ...URIComponent(transaction.URI),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
