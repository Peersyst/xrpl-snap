import { XrplTx } from 'common/models/transaction/tx.types';
import { getTransactionTokenAndAmount } from 'common/utils/xrpl/transaction-amount';
import { useMemo } from 'react';
import { Clawback } from 'xrpl';

export default function useClawbackTransactionDetails(tx: XrplTx<Clawback>) {
  return useMemo(() => {
    return {
      amount: getTransactionTokenAndAmount(tx.Amount)[1],
    };
  }, [tx]);
}
