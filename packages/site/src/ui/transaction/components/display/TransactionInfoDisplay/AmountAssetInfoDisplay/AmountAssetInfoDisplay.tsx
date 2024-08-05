import clsx from 'clsx';
import Amount from 'common/utils/Amount';
import { parseCurrencyCode } from 'common/utils/token/currencyCode';
import { useTranslate } from 'ui/locale';

import BalanceInfoDisplay from '../BalanceInfoDisplay/BalanceInfoDisplay';

export interface AmountAssetInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  asset: Amount;
  index: 1 | 2;
}

function AmountAssetInfoDisplay({ className, asset, index, ...rest }: AmountAssetInfoDisplayProps) {
  const translate = useTranslate('transactions');

  const currency = asset.currency === 'XRP' ? 'XRP' : parseCurrencyCode(asset.currency);

  return (
    <BalanceInfoDisplay
      className={clsx('AssetInfoDisplay', className)}
      label={translate('asset', { n: index })}
      currency={currency}
      balance={asset.formatAmount()}
      {...rest}
    />
  );
}

export default AmountAssetInfoDisplay;
