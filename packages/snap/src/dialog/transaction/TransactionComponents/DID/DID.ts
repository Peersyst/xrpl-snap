import type { Component } from '@metamask/snaps-sdk';

import { TransactionField } from '../base/base';
import { isString } from '../utils/data-types-validator';

const DataComponent = (data: string | undefined): Component[] => {
  if (!isString(data)) {
    return [];
  }
  return TransactionField('Data', data);
};

const DIDDocumentComponent = (didDocument: string | undefined): Component[] => {
  if (!isString(didDocument)) {
    return [];
  }
  return TransactionField('DIDDocument', didDocument);
};

export { DataComponent, DIDDocumentComponent };
