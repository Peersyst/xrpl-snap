import type { Component } from '@metamask/snaps-sdk';
import type { SignerEntry, SignerListSet } from 'xrpl';

import { Label, TransactionField, TransactionRow } from '../base/base';
import { isNumber } from '../utils/data-types-validator';

const SignerQuorumComponent = (signerQuorum: number | undefined): Component[] => {
  if (!isNumber(signerQuorum)) {
    return [];
  }
  return TransactionField('SignerQuorum', String(signerQuorum));
};

const SignerEntryComponent = (signerEntry: SignerEntry['SignerEntry']): Component[] => {
  if (!signerEntry) {
    return [];
  }
  const label: Component = Label('SignerEntry');
  const account: Component[] = TransactionRow('Account', signerEntry.Account);
  const signerWeight: Component[] = TransactionRow('SignerWeight', String(signerEntry.SignerWeight));
  return [label, ...account, ...signerWeight];
};

const SignerEntriesComponent = (signerEntries: SignerListSet['SignerEntries']): Component[] => {
  if (!signerEntries || signerEntries.length === 0) {
    return [];
  }

  const label = Label('SignerEntries');
  const children: Component[] = [];

  for (const { SignerEntry } of signerEntries) {
    children.push(...SignerEntryComponent(SignerEntry));
  }
  return [label, ...children];
};

export { SignerQuorumComponent, SignerEntriesComponent };
