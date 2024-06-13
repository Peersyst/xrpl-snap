import type { Component } from '@metamask/snaps-sdk';
import type { CheckCancel } from 'xrpl';

import { TransactionField } from '../base/base';

const CheckIDComponent = (checkID: CheckCancel['CheckID']): Component[] => {
  if (!checkID) {
    return [];
  }
  return TransactionField('CheckID', checkID);
};

export { CheckIDComponent };
