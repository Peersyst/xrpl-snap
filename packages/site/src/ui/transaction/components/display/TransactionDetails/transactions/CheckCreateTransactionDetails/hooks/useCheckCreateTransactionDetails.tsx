import { XrplTx } from 'common/models/transaction/tx.types';
import { getTransactionTokenAndAmount } from 'common/utils/xrpl/transaction-amount';
import { useMemo } from 'react';
import { CheckCreate } from 'xrpl';

export default function useCheckCreateTransactionDetails(tx: XrplTx<CheckCreate>) {
  return useMemo(() => {
    return {
      sendMax: getTransactionTokenAndAmount(tx.SendMax)[1],
    };
  }, [tx]);
}
