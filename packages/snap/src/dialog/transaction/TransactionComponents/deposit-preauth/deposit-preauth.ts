import type { Component } from '@metamask/snaps-sdk';
import type { DepositPreauth } from 'xrpl';

import { TransactionCopyableField } from '../base/base';
import { isString } from '../utils/data-types-validator';

const AuthorizeComponent = (authorize: DepositPreauth['Authorize']): Component[] => {
  if (!isString(authorize)) {
    return [];
  }
  return TransactionCopyableField('Authorize', authorize);
};

const UnauthorizeComponent = (unauthorize: DepositPreauth['Unauthorize']): Component[] => {
  if (!isString(unauthorize)) {
    return [];
  }
  return TransactionCopyableField('Unauthorize', unauthorize);
};

export { AuthorizeComponent, UnauthorizeComponent };
