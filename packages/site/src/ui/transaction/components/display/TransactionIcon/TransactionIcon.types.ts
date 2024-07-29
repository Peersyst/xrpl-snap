import { Transaction } from 'xrpl';

export interface TransactionIconProps {
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  txType: Transaction['TransactionType'];
  isReceiver: boolean;
}
