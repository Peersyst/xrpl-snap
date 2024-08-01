import { Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';
import { Currency } from 'xrpl';

export interface CurrencyInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  asset: Currency;
  index: 1 | 2;
}

function CurrencyInfoDisplay({ className, asset, index, ...rest }: CurrencyInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('CurrencyInfoDisplay', className)}
      title={translate('asset', { n: index })}
      content={
        <Typography variant="body1" fontWeight="500">
          {asset.currency}
        </Typography>
      }
      {...rest}
    />
  );
}

export default CurrencyInfoDisplay;
