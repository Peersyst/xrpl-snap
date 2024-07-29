import { Typography, TypographyProps } from '@peersyst/react-components';
import { Transaction } from 'xrpl';

import useTransactionLabel from './hooks/useTransactionLabel';

export interface TransactionLabelProps extends Omit<TypographyProps, 'children'> {
  isReceiver: boolean;
  txType: Transaction['TransactionType'];
  address: string;
}

function TransactionLabel({ txType, isReceiver, address, ...rest }: TransactionLabelProps) {
  const label = useTransactionLabel(txType, isReceiver, address);

  return <Typography {...rest}>{label}</Typography>;
}

export default TransactionLabel;
