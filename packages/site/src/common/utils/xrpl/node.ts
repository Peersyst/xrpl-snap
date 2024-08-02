/* eslint-disable no-implicit-coercion*/

import { Token } from 'common/models';
import Decimal from 'decimal.js';
import { IssuedCurrencyAmount, isCreatedNode, isModifiedNode, isDeletedNode } from 'xrpl';

import Amount from '../Amount';
import { getTransactionTokenAndAmount } from './transaction-amount';

export class AffectedNode {
  private readonly _node: any;

  get entryType(): string {
    return this._node.LedgerEntryType;
  }

  constructor(node: any) {
    switch (true) {
      case isCreatedNode(node):
        this._node = node.CreatedNode;
        break;
      case isModifiedNode(node):
        this._node = node.ModifiedNode;
        break;
      case isDeletedNode(node):
        this._node = node.DeletedNode;
        break;
      default:
        throw new Error('Invalid node type');
    }
  }

  getAMMAccountID(): string | undefined {
    if ('FinalFields' in this._node && this._node.FinalFields) {
      return this._node.FinalFields.Account as string;
    } else if ('NewFields' in this._node && this._node.NewFields) {
      return this._node.NewFields.Account as string;
    }
  }

  getLPTokenAmount(): [Token, Amount] | undefined {
    const balance: IssuedCurrencyAmount = (this._node.FinalFields || this._node.NewFields)?.Balance;
    const hasLpToken = balance.currency.startsWith('03');

    if (!hasLpToken) {
      return;
    }

    // If has LpToken the Amount will be an IssuedCurrencyAmount
    if (!this._node.FinalFields) {
      return getTransactionTokenAndAmount({
        value: new Decimal(balance.value).abs().toString(),
        currency: balance.currency,
        issuer: balance.issuer,
      });
    }
    const prevAmount = new Decimal(this._node.PreviousFields.Balance.value);
    const finalAmount = new Decimal(this._node.FinalFields.Balance.value);
    const dif = finalAmount.minus(prevAmount).abs().toString();
    return getTransactionTokenAndAmount({ value: dif, currency: balance.currency, issuer: balance.issuer });
  }

  isNFTSellOffer(): boolean {
    const flags = this._node?.FinalFields?.Flags;
    // eslint-disable-next-line no-bitwise
    return (flags & 1) !== 0;
  }

  getNFTAcceptOfferAmount(): [Token, Amount] | undefined {
    const amount = this._node?.FinalFields?.Amount;
    if (amount) {
      return getTransactionTokenAndAmount(amount);
    }
  }

  getNFTAcceptOfferOwner(): string | undefined {
    return this._node?.FinalFields?.Owner;
  }
}
