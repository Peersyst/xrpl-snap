import clsx from 'clsx';
import Amount from 'common/utils/Amount';
import { parseCurrencyCode } from 'common/utils/token/currencyCode';
import Balance from 'ui/common/components/display/Balance/Balance';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

export interface AssetInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  asset: Amount;
  index: 1 | 2;
  direction: 'in' | 'out';
}

function AssetInfoDisplay({ className, asset, index, direction, ...rest }: AssetInfoDisplayProps) {
  const translate = useTranslate('transactions');

  const currency = asset.currency === 'XRP' ? 'XRP' : parseCurrencyCode(asset.currency);

  return (
    <InfoDisplay
      className={clsx('AssetInfoDisplay', className)}
      title={translate(direction === 'in' ? 'assetIn' : 'assetOut', { n: index })}
      content={<Balance balance={asset.formatAmount()} variant="body1" currency={currency} fontWeight="500" />}
      {...rest}
    />
  );
}

export default AssetInfoDisplay;
