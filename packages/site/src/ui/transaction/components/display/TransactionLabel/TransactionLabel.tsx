import { Typography, TypographyProps } from '@peersyst/react-components';
import { Transaction } from 'xrpl';

import useTransactionLabel from './hooks/useTransactionLabel';

export interface TransactionLabelProps extends Omit<TypographyProps, 'children'> {
  isReceiver: boolean;
  tx: Transaction;
  address: string;
}

function TransactionLabel({ tx, isReceiver, address, ...rest }: TransactionLabelProps) {
  const label = useTransactionLabel(tx, isReceiver, address);

  return <Typography {...rest}>{label}</Typography>;
}

export default TransactionLabel;
