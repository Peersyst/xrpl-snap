import { XrplTx } from 'common/models/transaction/tx.types';
import { useMemo } from 'react';
import { EscrowFinish } from 'xrpl';

export default function useEscrowFinishTransactionDetails(tx: XrplTx<EscrowFinish>) {
  return useMemo(() => {
    return {
      destination: tx.meta?.getEscrowDestination(),
      previousTxHash: tx.meta?.getEscrowPreviousTxHash(),
    };
  }, [tx]);
}
