import type { Component } from '@metamask/snaps-sdk';
import type { AccountSet } from 'xrpl';

import { TransactionField, TransactionCopyableField } from '../base/base';

const ClearFlagComponent = (clearFlag: AccountSet['ClearFlag']): Component[] => {
  if (typeof clearFlag !== 'number') {
    return [];
  }
  return TransactionField('ClearFlag', String(clearFlag));
};

const DomainComponent = (domain: AccountSet['Domain']): Component[] => {
  if (!domain) {
    return [];
  }
  return TransactionField('Domain', domain);
};

const EmailHashComponent = (emailHash: AccountSet['EmailHash']): Component[] => {
  if (!emailHash) {
    return [];
  }
  return TransactionField('EmailHash', emailHash);
};

const MessageKeyComponent = (messageKey: AccountSet['MessageKey']): Component[] => {
  if (!messageKey) {
    return [];
  }
  return TransactionField('MessageKey', messageKey);
};

const TickSizeComponent = (tickSize: AccountSet['TickSize']): Component[] => {
  if (typeof tickSize !== 'number') {
    return [];
  }
  return TransactionField('TickSize', String(tickSize));
};

const TransferRateComponent = (transferRate: AccountSet['TransferRate']): Component[] => {
  if (typeof transferRate !== 'number') {
    return [];
  }
  return TransactionField('TransferRate', String(transferRate));
};

const NFTokenMinterComponent = (nftokenMinter: AccountSet['NFTokenMinter']): Component[] => {
  if (!nftokenMinter) {
    return [];
  }
  return TransactionCopyableField('NFTokenMinter', nftokenMinter);
};

export {
  ClearFlagComponent,
  DomainComponent,
  EmailHashComponent,
  MessageKeyComponent,
  TickSizeComponent,
  TransferRateComponent,
  NFTokenMinterComponent,
};
