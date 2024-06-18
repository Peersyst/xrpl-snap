import type { Component } from '@metamask/snaps-sdk';
import type { DIDDelete, Transaction } from 'xrpl';

import { AccountComponent, FeeComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class DIDDeleteDialogStrategy implements TransactionDialogStrategy<DIDDelete> {
  transactionType: Transaction['TransactionType'] = 'DIDDelete';

  /**
   * Builds the body of the dialog for a DIDDeleteDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Fee XRPAmount
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: DIDDelete): Component[] {
    return [...TransactionTypeComponent(this.transactionType), ...AccountComponent(transaction.Account), ...FeeComponent(transaction.Fee)];
  }
}
