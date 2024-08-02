import { Token } from 'common/models';
import Decimal from 'decimal.js';
import { dropsToXrp, getBalanceChanges, TransactionMetadata, xrpToDrops } from 'xrpl';

import Amount from '../Amount';
import { AffectedNode } from './node';
import { getTransactionTokenAndAmount } from './transaction-amount';

interface ParsedNftAcceptOffer {
  nftTokenId: string | undefined;
  amount: [Token, Amount] | undefined;
  seller: string | undefined;
  buyer: string | undefined;
}

export class TransactionMeta {
  meta: TransactionMetadata;

  nftoken_id: string | undefined;

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

    this.nftoken_id = (this.meta as any).nftoken_id;
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

  public parseNFTAcceptOffer(accepter: string): ParsedNftAcceptOffer {
    let amount: [Token, Amount] | undefined;
    let seller: string | undefined;
    let buyer: string | undefined;

    const acceptedOfferNodes = this.affectedNodes.filter((node) => node.entryType === 'NFTokenOffer');

    if (acceptedOfferNodes.length > 1) {
      const buyOfferNode = acceptedOfferNodes.find((node) => !node.isNFTSellOffer());
      const sellOfferNode = acceptedOfferNodes.find((node) => node.isNFTSellOffer());
      amount = buyOfferNode?.getNFTAcceptOfferAmount();
      buyer = buyOfferNode?.getNFTAcceptOfferOwner();
      seller = sellOfferNode?.getNFTAcceptOfferOwner();
    } else if (acceptedOfferNodes.length === 1) {
      const node = acceptedOfferNodes[0];
      const isSellOffer = node.isNFTSellOffer();
      const nodeOwner = node.getNFTAcceptOfferOwner();
      seller = isSellOffer ? accepter : nodeOwner;
      buyer = isSellOffer ? nodeOwner : accepter;
    }

    return { amount, nftTokenId: this.nftoken_id, seller, buyer };
  }

  public getEscrowNode(): AffectedNode | undefined {
    return this.affectedNodes.find((node) => node.nodeType === 'DeletedNode' && node.entryType === 'Escrow');
  }

  public getEscrowDestination(): string | undefined {
    const node = this.getEscrowNode();
    if (node) {
      return node.getEscrowDestination();
    }
  }

  public getEscrowFinishAmount(): [Token, Amount] | undefined {
    const node = this.getEscrowNode();
    if (node) {
      return node.getEscrowFinishAmount();
    }
  }

  public getEscrowPreviousTxHash(): string | undefined {
    const node = this.getEscrowNode();
    if (node) {
      return node.getEscrowPreviousTxHash();
    }
  }
}
