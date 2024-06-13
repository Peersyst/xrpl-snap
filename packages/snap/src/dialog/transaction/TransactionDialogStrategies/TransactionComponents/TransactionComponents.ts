import type { Component } from '@metamask/snaps-sdk';
import { text } from '@metamask/snaps-sdk';
import type { OfferCreate } from 'xrpl';

import { OfferSequenceComponent } from '../../TransactionComponents';
import { AmountComponent, FeeComponent } from '../../TransactionComponents/amount/amount';
import {
  AccountComponent,
  CancelAfterComponent,
  DestinationComponent,
  ExpirationComponent,
  IssuerComponent,
  OwnerComponent,
  TransactionTypeComponent,
  URIComponent,
} from '../../TransactionComponents/common/common';
import { DestinationTagComponent, InvoiceIDComponent, SendMaxComponent } from '../../TransactionComponents/payment/payment';

/**
 * Offers
 * @param takerPays
 */
const TakerPaysComponent = (takerPays: OfferCreate['TakerPays'] | undefined): Component[] => {
  if (!takerPays) {
    return [];
  }
  return AmountComponent(takerPays, 'TakerPays');
};

const TakerGetsComponent = (takerGets: OfferCreate['TakerGets'] | undefined): Component[] => {
  if (!takerGets) {
    return [];
  }
  return AmountComponent(takerGets, 'TakerGets');
};

/**
 * DefaultTransaction
 * @param transaction
 */
const FullTransactionComponent = (transaction: Record<string, unknown>): Component[] => {
  return Object.keys(transaction).map((key) => {
    return text(`${key}: ${JSON.stringify(transaction[key])}`);
  });
};

export {
  OwnerComponent,
  AmountComponent,
  DestinationComponent,
  AccountComponent,
  FeeComponent,
  DestinationTagComponent,
  InvoiceIDComponent,
  TransactionTypeComponent,
  SendMaxComponent,
  ExpirationComponent,
  URIComponent,
  CancelAfterComponent,
  OfferSequenceComponent,
  TakerPaysComponent,
  TakerGetsComponent,
  IssuerComponent,
  FullTransactionComponent,
};
