import type { Token } from 'common/models/token';
import type Amount from 'common/utils/Amount';

export type TransactionCardProps = {
  account: string;
  timestamp: number;
  amount: Amount;
  token: Token;
  direction: 'out' | 'in';
  loading?: boolean;
};
