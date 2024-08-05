import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import BalanceInfoDisplay from '../BalanceInfoDisplay/BalanceInfoDisplay';

export interface FeeInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  fee: string;
}

function FeeInfoDisplay({ className, fee, ...rest }: FeeInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <BalanceInfoDisplay className={clsx('FeeInfoDisplay', className)} label={translate('fee')} currency="XRP" balance={fee} {...rest} />
  );
}

export default FeeInfoDisplay;
