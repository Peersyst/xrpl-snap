import type { Component } from '@metamask/snaps-sdk';
import type { EscrowCreate, EscrowFinish } from 'xrpl';

import { TransactionField } from '../base/base';
import { XrplTimeComponent } from '../common/common';
import { isNumber, isString } from '../utils/data-types-validator';

const FinishAfterComponent = (finishAfter: EscrowCreate['FinishAfter'] | undefined): Component[] => {
  if (!isNumber(finishAfter)) {
    return [];
  }
  return XrplTimeComponent('FinishAfter', finishAfter);
};

const ConditionComponent = (condition: EscrowCreate['Condition'] | undefined): Component[] => {
  if (!isString(condition)) {
    return [];
  }
  return TransactionField('Condition', condition);
};

const FulfillmentComponent = (fulfillment: EscrowFinish['Fulfillment'] | undefined): Component[] => {
  if (!isString(fulfillment)) {
    return [];
  }
  return TransactionField('Fulfillment', fulfillment);
};

export { FinishAfterComponent, ConditionComponent, FulfillmentComponent };
