import type { Component } from '@metamask/snaps-sdk';

import { TransactionField } from '../base/base';
import { isNumber, isString } from '../utils/data-types-validator';

const OfferSequenceComponent = (offerSequence: number | string | undefined): Component[] => {
  if (!(isString(offerSequence) || isNumber(offerSequence))) {
    return [];
  }
  return TransactionField('OfferSequence', String(offerSequence));
};

export { OfferSequenceComponent };
