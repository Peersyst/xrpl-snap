import clsx from 'clsx';
import Balance from 'ui/common/components/display/Balance/Balance';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';
import { dropsToXrp } from 'xrpl';

export interface FeeInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  fee: string;
}

function FeeInfoDisplay({ className, fee, ...rest }: FeeInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('FeeInfoDisplay', className)}
      title={translate('fee')}
      content={<Balance balance={dropsToXrp(fee)} variant="body1" currency="XRP" fontWeight="500" />}
      {...rest}
    />
  );
}

export default FeeInfoDisplay;
