import { XrplTx } from 'common/models/transaction/tx.types';
import { getTransactionTokenAndAmount } from 'common/utils/xrpl/transaction-amount';
import { useMemo } from 'react';
import { TrustSet } from 'xrpl';

export default function useTrustSetTransactionDetails(tx: XrplTx<TrustSet>) {
  return useMemo(() => {
    return {
      limitAmount: getTransactionTokenAndAmount(tx.LimitAmount)[1],
      isRemove: tx.LimitAmount.value === '0',
      isIncoming: tx.LimitAmount.issuer === tx.Account,
    };
  }, [tx]);
}
