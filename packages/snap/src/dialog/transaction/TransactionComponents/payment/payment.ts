import type { Component } from '@metamask/snaps-sdk';
import type { Amount, Payment } from 'xrpl';

import { AmountComponent } from '../amount/amount';
import { TransactionField } from '../base/base';
import { isNumber, isString } from '../utils/data-types-validator';

const SendMaxComponent = (sendMax: Amount | undefined): Component[] => {
  if (!sendMax) {
    return [];
  }
  return AmountComponent(sendMax, 'SendMax');
};

const DestinationTagComponent = (destinationTag: Payment['DestinationTag']): Component[] => {
  if (!isNumber(destinationTag)) {
    return [];
  }
  return TransactionField('DestinationTag', String(destinationTag));
};

const InvoiceIDComponent = (invoiceID: Payment['InvoiceID']): Component[] => {
  if (!isString(invoiceID)) {
    return [];
  }
  return TransactionField('InvoiceID', invoiceID);
};

const DeliverMinComponent = (deliverMin: Amount | undefined): Component[] => {
  if (!deliverMin) {
    return [];
  }
  return AmountComponent(deliverMin, 'DeliverMin');
};

export { DeliverMinComponent, SendMaxComponent, DestinationTagComponent, InvoiceIDComponent };
