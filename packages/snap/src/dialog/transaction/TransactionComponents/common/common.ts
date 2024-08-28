import type { Component } from '@metamask/snaps-sdk';
import { copyable, row, text } from '@metamask/snaps-sdk';
import type { LocaleKey } from 'src/dialog/locale/translate';
import type { Transaction } from 'xrpl';
import { type IssuedCurrencyAmount } from 'xrpl';
import { hexToString } from '@xrplf/isomorphic/utils';
import { Label, TransactionCopyableField, TransactionField } from '../base/base';
import { formatRippleTime, translateLabel } from '../utils';
import { isNumber, isString } from '../utils/data-types-validator';

const Issuer = (issuer: IssuedCurrencyAmount['issuer']): Component => {
  return text(`${translateLabel('Issuer')} ${issuer}`);
};

const IssuerComponent = (issuer: IssuedCurrencyAmount['issuer'] | undefined): Component[] => {
  if (!isString(issuer)) {
    return [];
  }
  return TransactionField('Issuer', issuer);
};

const DestinationComponent = (destination: string | undefined): Component[] => {
  if (!isString(destination)) {
    return [];
  }
  return TransactionCopyableField('Destination', destination);
};

const AccountComponent = (account: string | undefined): Component[] => {
  if (!isString(account)) {
    return [];
  }
  return TransactionCopyableField('Account', account);
};

const TransactionTypeComponent = (type: Transaction['TransactionType'] | undefined): Component[] => {
  if (!isString(type)) {
    return [];
  }
  return [text(`${translateLabel('TransactionType')} ${type}`)];
};

const XrplTimeComponent = (label: LocaleKey, rippleTime: number | undefined): Component[] => {
  if (!isNumber(rippleTime)) {
    return [];
  }
  const time = formatRippleTime(rippleTime);
  return [Label(label), row(String(rippleTime), text(time))];
};

const ExpirationComponent = (expiration: number | undefined): Component[] => {
  if (!isNumber(expiration)) {
    return [];
  }
  return XrplTimeComponent('Expiration', expiration);
};

const URIComponent = (uri: string | undefined | null): Component[] => {
  if (!isString(uri)) {
    return [];
  }
  return TransactionField('URI', hexToString(uri));
};

const OwnerComponent = (owner: string | undefined): Component[] => {
  if (!isString(owner)) {
    return [];
  }
  return TransactionCopyableField('Owner', owner);
};

const CancelAfterComponent = (cancelAfter: number | undefined): Component[] => {
  if (!isNumber(cancelAfter)) {
    return [];
  }
  return XrplTimeComponent('CancelAfter', cancelAfter);
};

const FullTransactionComponent = (transaction: object): Component[] => {
  const components: Component[] = [];
  const keys = Object.keys(transaction);
  for (const key of keys) {
    components.push(...[text(`**${key}**:`), copyable(JSON.stringify(transaction[key]))]);
  }
  return components;
};

export {
  CancelAfterComponent,
  Issuer,
  IssuerComponent,
  ExpirationComponent,
  DestinationComponent,
  AccountComponent,
  TransactionTypeComponent,
  XrplTimeComponent,
  URIComponent,
  OwnerComponent,
  FullTransactionComponent,
};
