/* eslint-disable no-case-declarations */
import { Token } from 'common/models';
import { XrplTx } from 'common/models/transaction/tx.types';
import Amount from 'common/utils/Amount';
import { isPartialPayment } from 'common/utils/xrpl/flags';
import { getTransactionTokenAndAmount } from 'common/utils/xrpl/transaction-amount';

export default function useTransactionAmount(tx: XrplTx): [Token, Amount] | undefined {
  const { meta } = tx;
  switch (tx.TransactionType) {
    case 'AccountDelete':
      if (meta?.deliveredAmount) {
        return meta.deliveredAmount;
      }
      break;
    case 'AMMDeposit':
    case 'AMMWithdraw':
    case 'AMMBid':
    case 'AMMCreate':
      const lpTokenAmount = meta?.getLPTokenAmount();
      if (lpTokenAmount) {
        return lpTokenAmount;
      }
      break;
    case 'EscrowCreate':
      return getTransactionTokenAndAmount(tx.Amount);
    case 'EscrowFinish':
      return meta?.getEscrowFinishAmount();
    case 'CheckCash':
      const checkCashAmount = tx.Amount || tx.DeliverMin;
      if (checkCashAmount) {
        return getTransactionTokenAndAmount(checkCashAmount);
      }
      break;
    case 'NFTokenAcceptOffer':
      return tx.meta?.parseNFTAcceptOffer(tx.Account).amount;
    case 'OfferCreate':
      return getTransactionTokenAndAmount(tx.TakerPays);
    case 'Payment':
      const partial = isPartialPayment(tx.Flags);
      if (tx.Account === tx.Destination || partial) {
        return meta?.deliveredAmount;
      }
      return getTransactionTokenAndAmount(tx.Amount);
    default:
  }
}
