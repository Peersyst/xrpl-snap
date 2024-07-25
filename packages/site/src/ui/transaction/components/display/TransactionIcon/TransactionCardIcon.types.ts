import { Transaction } from 'xrpl';

export interface TransactionCardIconProps {
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  txType: Transaction['TransactionType'];
  isReceiver: boolean;
}
