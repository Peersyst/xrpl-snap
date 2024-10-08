import { ChipIconButtonProps } from 'ui/common/components/input/ChipIconButton/ChipIconButton';
import { Transaction } from 'xrpl';

export interface TransactionIconProps {
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  txType: Transaction['TransactionType'];
  border?: boolean;
  isReceiver: boolean;
  size?: ChipIconButtonProps['size'];
}
