import type { Component } from '@metamask/snaps-sdk';
import type { NFTokenBurn, Transaction } from 'xrpl';

import { AccountComponent, FeeComponent, NFTokenIDComponent, OwnerComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class NFTokenBurnDialogStrategy implements TransactionDialogStrategy<NFTokenBurn> {
  transactionType: Transaction['TransactionType'] = 'NFTokenBurn';

  /**
   * Builds the body of the dialog for a NFTokenBurnDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - NFTokenID (string)
   * - Owner (string)
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: NFTokenBurn): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...NFTokenIDComponent(transaction.NFTokenID),
      ...OwnerComponent(transaction.Owner),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
