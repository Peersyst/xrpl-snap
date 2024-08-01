import { Token } from 'common/models';
import Decimal from 'decimal.js';
import { dropsToXrp, getBalanceChanges, TransactionMetadata, xrpToDrops } from 'xrpl';

import Amount from '../Amount';
import { AffectedNode } from './node';
import { getTransactionTokenAndAmount } from './transaction-amount';

export class TransactionMeta {
  meta: TransactionMetadata;

  affectedNodes: AffectedNode[] = [];

  deliveredAmount: [Token, Amount] | undefined;

  constructor(meta: TransactionMetadata) {
    this.meta = meta;
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

  public getAMMAccountID(): string | undefined {
    return this.affectedNodes.find((node) => node.entryType === 'AMM')?.getAMMAccountID();
  }

  public findAssetsChanges(account: string, Fee?: string): [Token, Amount][] | undefined {
    const accountBalanceChanges = getBalanceChanges(this.meta).find((balance) => balance.account === account);

    if (accountBalanceChanges) {
      return accountBalanceChanges.balances.map((balance) => {
        if (balance.currency === 'XRP') {
          let xrpValue = new Decimal(balance.value).abs();
          if (Fee) {
            xrpValue = xrpValue.minus(dropsToXrp(Fee));
          }
          return getTransactionTokenAndAmount(xrpToDrops(xrpValue.toString()));
        }
        return getTransactionTokenAndAmount({
          currency: balance.currency,
          issuer: balance.issuer || '',
          value: new Decimal(balance.value).abs().toFixed(14),
        });
      });
    }
  }
}
