import { XrplTx } from 'common/models/transaction/tx.types';
import { useMemo } from 'react';

import { extractTransactionProps } from './utils/transaction.utils';

export default function useParseTransaction(tx: XrplTx, accountAddress: string) {
  return useMemo(() => extractTransactionProps(tx, accountAddress), [tx, accountAddress]);
}
