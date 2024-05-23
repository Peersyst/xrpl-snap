import type { Component } from '@metamask/snaps-sdk';
import { text } from '@metamask/snaps-sdk';
import type { Transaction } from 'xrpl';

import { translate } from '../locale/translate';

const TransactionType = (transaction: Transaction): Component[] => [
  text(
    translate('TransactionType', {
      0: transaction.TransactionType,
    }),
  ),
];
const Account = (transaction: Transaction): Component[] => [
  text(
    translate('Account', {
      0: transaction.Account,
    }),
  ),
];
const Destination = (transaction: Transaction): Component[] => {
  if (transaction.TransactionType !== 'Payment') {
    return [];
  }
  return [
    text(
      translate('Destination', {
        0: transaction.Destination,
      }),
    ),
  ];
};
const Amount = (transaction: Transaction): Component[] => {
  if (transaction.TransactionType !== 'Payment') {
    return [];
  }
  return [
    text(
      translate('Amount', {
        0: transaction.Amount.toString(),
      }),
    ),
  ];
};

export default {
  TransactionType,
  Account,
  Destination,
  Amount,
};
