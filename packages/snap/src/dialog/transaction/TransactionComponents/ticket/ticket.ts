import type { Component } from '@metamask/snaps-sdk';

import { TransactionField } from '../base/base';
import { isNumber } from '../utils/data-types-validator';

const TicketCountComponent = (ticketCount: number | undefined): Component[] => {
  if (!isNumber(ticketCount)) {
    return [];
  }
  return TransactionField('TicketCount', String(ticketCount));
};

export { TicketCountComponent };
