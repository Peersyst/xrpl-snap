import type { Token } from 'common/models/token';
import type Amount from 'common/utils/Amount';
import { Transaction } from 'xrpl';

export type TransactionCardProps = {
  account: string;
  timestamp: number;
  amount?: Amount;
  token?: Token;
  direction: 'out' | 'in';
  loading?: boolean;
  txHash: string;
  txType: Transaction['TransactionType'];
};
