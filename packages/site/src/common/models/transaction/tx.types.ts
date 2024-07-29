import { TransactionMeta } from 'common/utils/xrpl/meta';
import { ResponseOnlyTxInfo, Transaction } from 'xrpl';

export type XrplTx = Transaction &
  ResponseOnlyTxInfo & {
    meta?: TransactionMeta;
  };

export type TransactionsWithMarker = {
  transactions: XrplTx[];
  marker: unknown;
};

export const AMM_TX_TYPES = ['AMMBid', 'AMMCreate', 'AMMDelete', 'AMMDeposit', 'AMMVote', 'AMMWithdraw'];

export const ACCOUNT_TX_TYPES = ['AccountDelete', 'AccountSet'];

export const PAYMENT_TX_TYPES = ['Payment', 'PaymentChannelClaim', 'PaymentChannelCreate', 'PaymentChannelFund'];

export const DEX_TX_TYPES = ['OfferCancel', 'OfferCreate'];

export const NFT_TX_TYPES = ['NFTokenAcceptOffer', 'NFTokenBurn', 'NFTokenCancelOffer', 'NFTokenCreateOffer', 'NFTokenMint'];
