import type { Component } from '@metamask/snaps-sdk';

import { TransactionCopyableField } from '../base/base';
import { isString } from '../utils/data-types-validator';

const RegularKeyComponent = (regularKey: string | undefined): Component[] => {
  if (!isString(regularKey)) {
    return [];
  }
  return TransactionCopyableField('RegularKey', regularKey);
};

export { RegularKeyComponent };
