import type { Component } from '@metamask/snaps-sdk';
import type { OfferCreate } from 'xrpl';

import { AmountComponent } from '../amount/amount';
import { TransactionField } from '../base/base';
import { isNumber, isString } from '../utils/data-types-validator';

const OfferSequenceComponent = (offerSequence: number | string | undefined): Component[] => {
  if (!(isString(offerSequence) || isNumber(offerSequence))) {
    return [];
  }
  return TransactionField('OfferSequence', String(offerSequence));
};

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

export { OfferSequenceComponent, TakerPaysComponent, TakerGetsComponent };
