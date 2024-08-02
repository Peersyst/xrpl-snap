import clsx from 'clsx';
import Balance from 'ui/common/components/display/Balance/Balance';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';

export interface BalanceInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  label: string;
  currency: string;
  balance: string;
}

function BalanceInfoDisplay({ className, balance, label, currency, ...rest }: BalanceInfoDisplayProps) {
  return (
    <InfoDisplay
      className={clsx('BalanceInfoDisplay', className)}
      title={label}
      content={<Balance balance={balance} variant="body1" currency={currency} fontWeight="500" />}
      {...rest}
    />
  );
}

export default BalanceInfoDisplay;
