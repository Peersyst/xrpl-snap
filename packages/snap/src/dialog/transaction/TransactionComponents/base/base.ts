import type { Component } from '@metamask/snaps-sdk';
import { copyable, text } from '@metamask/snaps-sdk';

import type { LocaleKey } from '../../../locale/translate';
import { translateLabel } from '../utils';

const Label = (label: LocaleKey): ReturnType<typeof text> => {
  return text(translateLabel(label));
};

const BaseTransactionField = (label: LocaleKey, children: Component): Component[] => {
  return [Label(label), children];
};

const TransactionCopyableField = (label: LocaleKey, value: string): Component[] => {
  return BaseTransactionField(label, copyable(value));
};

const TransactionField = (label: LocaleKey, value: string): Component[] => {
  return BaseTransactionField(label, text(value));
};

const TransactionRow = (label: LocaleKey, value: string): Component[] => {
  return [text(`${translateLabel(label)} ${value}`)];
};

export { BaseTransactionField, TransactionCopyableField, TransactionField, TransactionRow, Label };
