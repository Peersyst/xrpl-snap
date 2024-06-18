import type { Component } from '@metamask/snaps-sdk';
import type { TrustSet } from 'xrpl';

import { IssuedCurrencyAmountComponent } from '../amount/amount';
import { TransactionField } from '../base/base';
import { isNumber } from '../utils/data-types-validator';

const LimitAmountComponent = (limitAmount: TrustSet['LimitAmount'] | undefined): Component[] => {
  if (!limitAmount) {
    return [];
  }
  return IssuedCurrencyAmountComponent(limitAmount, 'LimitAmount');
};

const QualityInComponent = (qualityIn: TrustSet['QualityIn'] | undefined): Component[] => {
  if (!isNumber(qualityIn)) {
    return [];
  }
  return TransactionField('QualityIn', String(qualityIn));
};

const QualityOutComponent = (qualityOut: TrustSet['QualityOut'] | undefined): Component[] => {
  if (!isNumber(qualityOut)) {
    return [];
  }
  return TransactionField('QualityOut', String(qualityOut));
};

export { LimitAmountComponent, QualityInComponent, QualityOutComponent };
