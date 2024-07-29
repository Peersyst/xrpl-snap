import { Token } from 'common/models';
import { TransactionMetadata } from 'xrpl';

import Amount from '../Amount';
import { AffectedNode } from './node';
import { getTransactionTokenAndAmount } from './transaction-amount';

export class TransactionMeta {
  affectedNodes: AffectedNode[] = [];

  deliveredAmount: [Token, Amount] | undefined;

  constructor(meta: TransactionMetadata) {
    if (meta.AffectedNodes) {
      this.affectedNodes = meta.AffectedNodes.map((node) => new AffectedNode(node));
    }
    const deliveredAmount = meta.delivered_amount || meta.DeliveredAmount;
    if (deliveredAmount) {
      this.deliveredAmount = getTransactionTokenAndAmount(deliveredAmount);
    }
  }

  public getLPTokenAmount(): [Token, Amount] | undefined {
    for (const node of this.affectedNodes) {
      if (node.entryType === 'RippleState') {
        const lpTokenAmount = node.getLPTokenAmount();
        if (lpTokenAmount) {
          return lpTokenAmount;
        }
      }
    }
  }
}
