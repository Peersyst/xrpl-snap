import clsx from 'clsx';
import { normalizeTransferRate } from 'common/utils/xrpl/transfer-rate';
import { useTranslate } from 'ui/locale';

import BalanceInfoDisplay from '../BalanceInfoDisplay/BalanceInfoDisplay';

export interface TransferRateInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  transferRate: number;
}

function TransferRateInfoDisplay({ className, transferRate, ...rest }: TransferRateInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <BalanceInfoDisplay
      className={clsx('TransferRateInfoDisplay', className)}
      label={translate('transferRate')}
      balance={normalizeTransferRate(transferRate)}
      {...rest}
    />
  );
}

export default TransferRateInfoDisplay;
