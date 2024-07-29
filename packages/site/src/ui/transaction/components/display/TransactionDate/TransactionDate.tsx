import { Skeleton } from '@peersyst/react-components';
import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useMemo } from 'react';
import DateDisplay from 'ui/common/components/display/DateDisplay/DateDisplay';
import { DateDisplayProps } from 'ui/common/components/display/DateDisplay/DateDisplay.types';
import { rippleTimeToUnixTime } from 'xrpl';

export interface TransactionDateProps extends Omit<DateDisplayProps, 'date'> {
  tx: XrplTx;
  loading?: boolean;
}

function TransactionDate({ className, tx, loading, ...rest }: TransactionDateProps) {
  const timestamp = useMemo(() => rippleTimeToUnixTime(tx.date!), [tx]);
  return (
    <Skeleton loading={loading}>
      <DateDisplay className={clsx('TransactionDate', className)} date={timestamp} {...rest} />
    </Skeleton>
  );
}

export default TransactionDate;
