import type { Component } from '@metamask/snaps-sdk';
import type { NFTokenAcceptOffer, Transaction } from 'xrpl';

import {
  AccountComponent,
  FeeComponent,
  NFTokenBrokerFeeComponent,
  NFTokenBuyOfferComponent,
  NFTokenSellOfferComponent,
  TransactionTypeComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class NFTokenAcceptOfferDialogStrategy implements TransactionDialogStrategy<NFTokenAcceptOffer> {
  transactionType: Transaction['TransactionType'] = 'NFTokenAcceptOffer';

  /**
   * Builds the body of the dialog for a NFTokenAcceptOfferDialogStrategy transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - NFTokenSellOffer (string)
   * - NFTokenBuyOffer (string)
   * - NFTokenBrokerFee (Amount)
   *
   * @param transaction - The transaction to build the dialog for
   * @returns Components to render in the dialog
   */
  buildBody(transaction: NFTokenAcceptOffer): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(transaction.Account),
      ...NFTokenBuyOfferComponent(transaction.NFTokenBuyOffer),
      ...NFTokenSellOfferComponent(transaction.NFTokenSellOffer),
      ...NFTokenBrokerFeeComponent(transaction.NFTokenBrokerFee),
      ...FeeComponent(transaction.Fee),
    ];
  }
}
