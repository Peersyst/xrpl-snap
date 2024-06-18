import type { Component } from '@metamask/snaps-sdk';
import { text } from '@metamask/snaps-sdk';
import type { NFTokenAcceptOffer, NFTokenCreateOffer, NFTokenCancelOffer, NFTokenMint } from 'xrpl';

import { AmountComponent } from '../amount/amount';
import { Label, TransactionField } from '../base/base';
import { isNumber, isString } from '../utils/data-types-validator';

const NFTokenSellOfferComponent = (nftokenSellOffer: NFTokenAcceptOffer['NFTokenSellOffer']): Component[] => {
  if (!isString(nftokenSellOffer)) {
    return [];
  }
  return TransactionField('NFTokenSellOffer', nftokenSellOffer);
};

const NFTokenBuyOfferComponent = (nftokenBuyOffer: NFTokenAcceptOffer['NFTokenBuyOffer']): Component[] => {
  if (!isString(nftokenBuyOffer)) {
    return [];
  }
  return TransactionField('NFTokenBuyOffer', nftokenBuyOffer);
};

const NFTokenBrokerFeeComponent = (nftokenBrokerFee: NFTokenAcceptOffer['NFTokenBrokerFee']): Component[] => {
  if (!nftokenBrokerFee) {
    return [];
  }
  return AmountComponent(nftokenBrokerFee, 'NFTokenBrokerFee');
};

const NFTokenIDComponent = (nftokenID: NFTokenCreateOffer['NFTokenID']): Component[] => {
  if (!isString(nftokenID)) {
    return [];
  }
  return TransactionField('NFTokenID', nftokenID);
};

const NFTokenOffersComponent = (nftokenOffers: NFTokenCancelOffer['NFTokenOffers'] | undefined): Component[] => {
  if (!nftokenOffers || nftokenOffers.length === 0) {
    return [];
  }
  const offers = nftokenOffers.map((offer) => text(offer));
  return [Label('NFTokenOffers'), ...offers];
};

const NFTokenTaxonComponent = (nftokenTaxon: NFTokenMint['NFTokenTaxon'] | undefined): Component[] => {
  if (!isNumber(nftokenTaxon)) {
    return [];
  }
  return TransactionField('NFTokenTaxon', String(nftokenTaxon));
};

const TransferFeeComponent = (transferFee: NFTokenMint['TransferFee'] | undefined): Component[] => {
  if (!isNumber(transferFee)) {
    return [];
  }
  const parsedFee = Number(transferFee) / 1000;
  return TransactionField('TransferFee', `${parsedFee} (${parsedFee}%)`);
};

export {
  TransferFeeComponent,
  NFTokenSellOfferComponent,
  NFTokenBuyOfferComponent,
  NFTokenBrokerFeeComponent,
  NFTokenIDComponent,
  NFTokenOffersComponent,
  NFTokenTaxonComponent,
};
