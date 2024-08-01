import clsx from 'clsx';
import Amount from 'common/utils/Amount';
import { parseCurrencyCode } from 'common/utils/token/currencyCode';
import Balance from 'ui/common/components/display/Balance/Balance';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

export interface BidInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  bid: Amount;
  type: 'min' | 'max';
}

function BidInfoDisplay({ className, bid, type, ...rest }: BidInfoDisplayProps) {
  const translate = useTranslate('transactions');

  const currency = bid.currency === 'XRP' ? 'XRP' : parseCurrencyCode(bid.currency);
  const translateKey = type === 'min' ? 'minimumSlotPrice' : 'maximumSlotPrice';

  return (
    <InfoDisplay
      className={clsx('BidInfoDisplay', className)}
      title={translate(translateKey)}
      content={<Balance balance={bid.formatAmount()} variant="body1" currency={currency} fontWeight="500" />}
      {...rest}
    />
  );
}

export default BidInfoDisplay;
