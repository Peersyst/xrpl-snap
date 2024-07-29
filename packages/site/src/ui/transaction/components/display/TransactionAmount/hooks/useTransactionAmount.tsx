/* eslint-disable no-case-declarations */
import { Token } from 'common/models';
import { XrplTx } from 'common/models/transaction/tx.types';
import Amount from 'common/utils/Amount';
import { getTransactionTokenAndAmount } from 'common/utils/xrpl/transaction-amount';
import { Payment } from 'xrpl';

export default function useTransactionAmount(tx: XrplTx): [Token, Amount] | undefined {
  const { meta } = tx;
  switch (tx.TransactionType) {
    case 'Payment':
      if (tx.Account === tx.Destination && meta?.deliveredAmount) {
        return meta.deliveredAmount;
      }
      return getTransactionTokenAndAmount((tx as Payment).Amount);
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
    default:
  }
}
