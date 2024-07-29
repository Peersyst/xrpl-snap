import type { Component } from '@metamask/snaps-sdk';
import { text } from '@metamask/snaps-sdk';
import type { Transaction } from 'xrpl';

import { SNAP_CONFIG } from '../../../../config/config';
import { translate } from '../../../locale/translate';

const ReviewTransactionComponent = (transaction?: Transaction): Component[] => {
  if (!transaction) {
    return [];
  }
  const uriTransaction = `${SNAP_CONFIG.reviewUrl}?data=${encodeURIComponent(JSON.stringify(transaction))}`;
  return [text(translate('VerifyCompleteTx', { uriTransaction }))];
};

export { ReviewTransactionComponent };
