import { Hash } from '@peersyst/react-components';
import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

export interface TransactionHashInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  hash: string;
}

function TransactionHashInfoDisplay({ className, hash, ...rest }: TransactionHashInfoDisplayProps) {
  const translate = useTranslate('transactions');
  return (
    <InfoDisplay
      className={clsx('TransactionHashInfoDisplay', className)}
      title={translate('transactionHash')}
      content={<Hash length={13} hash={hash} variant="body1" fontWeight="500" showCopyIcon />}
      {...rest}
    />
  );
}

export default TransactionHashInfoDisplay;
