import clsx from 'clsx';
import { formatTradingFee } from 'common/utils/xrpl/trading-fee';
import { useTranslate } from 'ui/locale';
import { AMMVote } from 'xrpl';

import BalanceInfoDisplay from '../BalanceInfoDisplay/BalanceInfoDisplay';

export interface TradingFeeInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  tradingFee: AMMVote['TradingFee'];
}

function TradingFeeInfoDisplay({ className, tradingFee, ...rest }: TradingFeeInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <BalanceInfoDisplay
      className={clsx('TradingFeeInfoDisplay', className)}
      label={translate('tradingFee')}
      balance={formatTradingFee(tradingFee)}
      currency="%"
      {...rest}
    />
  );
}

export default TradingFeeInfoDisplay;
