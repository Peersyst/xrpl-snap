import { XrplTx } from 'common/models/transaction/tx.types';
import { useMemo } from 'react';
import useWalletState from 'ui/adapter/state/useWalletState';

import { extractTransactionProps } from './utils/transaction.utils';

export default function useParseTransaction(tx: XrplTx, accountAddress?: string) {
  const { address = '' } = useWalletState();
  const walletAddress = accountAddress || address;
  return useMemo(() => extractTransactionProps(tx, walletAddress), [tx, walletAddress]);
}
