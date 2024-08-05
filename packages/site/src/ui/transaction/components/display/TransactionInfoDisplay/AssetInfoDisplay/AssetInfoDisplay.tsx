import clsx from 'clsx';
import Amount from 'common/utils/Amount';
import { useTranslate } from 'ui/locale';

import AmountInfoDisplay from '../AmountInfoDisplay/AmountInfoDisplay';

export interface AssetInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  asset: Amount;
  index: 1 | 2;
  direction: 'in' | 'out';
}

function AssetInfoDisplay({ className, asset, index, direction, ...rest }: AssetInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <AmountInfoDisplay
      className={clsx('AssetInfoDisplay', className)}
      label={translate(direction === 'in' ? 'assetIn' : 'assetOut', { n: index })}
      amount={asset}
      {...rest}
    />
  );
}

export default AssetInfoDisplay;
