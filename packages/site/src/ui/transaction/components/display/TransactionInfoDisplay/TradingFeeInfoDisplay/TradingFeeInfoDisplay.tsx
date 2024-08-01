import { Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { formatTradingFee } from 'common/utils/xrpl/trading-fee';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';
import { AMMVote } from 'xrpl';

export interface TradingFeeInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  tradingFee: AMMVote['TradingFee'];
}

function TradingFeeInfoDisplay({ className, tradingFee, ...rest }: TradingFeeInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('TradingFeeInfoDisplay', className)}
      title={translate('tradingFee')}
      content={
        <Typography variant="body1" fontWeight="500">
          {`${formatTradingFee(tradingFee)} %`}
        </Typography>
      }
      {...rest}
    />
  );
}

export default TradingFeeInfoDisplay;
