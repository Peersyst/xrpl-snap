import { XrplTx } from 'common/models/transaction/tx.types';

export type TransactionProps = {
  accountAddress: string;
  loading?: boolean;
  tx: XrplTx;
};

export type InnerTransactionProps = TransactionProps & {
  onClick: () => void;
};
