import type { Component } from '@metamask/snaps-sdk';
import type { Transaction } from 'xrpl';
import { type Amount, type IssuedCurrencyAmount } from 'xrpl';

import type { LocaleKey } from '../../../locale/translate';
import { TransactionField } from '../base/base';
import { Issuer } from '../common/common';
import { formatXrpAmount, formatIOUAmount } from '../utils';

const XRPAmountComponent = (amount: string, label: LocaleKey = 'Amount'): Component[] => {
  return TransactionField(label, formatXrpAmount(amount));
};

const IssuedCurrencyAmountComponent = (amount: IssuedCurrencyAmount, label: LocaleKey = 'Amount'): Component[] => {
  return [...TransactionField(label, formatIOUAmount(amount)), Issuer(amount.issuer)];
};

const CompactIssuedCurrencyAmountComponent = (amount: IssuedCurrencyAmount, label: LocaleKey = 'Amount'): Component[] => {
  return TransactionField(label, `${formatIOUAmount(amount)}.${amount.issuer}`);
};

const AmountComponent = (amount: Amount | undefined, label: LocaleKey = 'Amount'): Component[] => {
  if (!amount) {
    return [];
  }
  if (typeof amount === 'string') {
    return XRPAmountComponent(amount, label);
  }
  return IssuedCurrencyAmountComponent(amount, label);
};

const FeeComponent = (fee: Transaction['Fee']): Component[] => {
  if (!fee) {
    return [];
  }
  return XRPAmountComponent(fee, 'Fee');
};

export { FeeComponent, XRPAmountComponent, IssuedCurrencyAmountComponent, CompactIssuedCurrencyAmountComponent, AmountComponent };
