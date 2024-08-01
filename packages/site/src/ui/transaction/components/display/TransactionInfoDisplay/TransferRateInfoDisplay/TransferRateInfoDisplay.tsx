import { Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { normalizeTransferRate } from 'common/utils/xrpl/transfer-rate';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

export interface TransferRateInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  transferRate: number;
}

function TransferRateInfoDisplay({ className, transferRate, ...rest }: TransferRateInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('TransferRateInfoDisplay', className)}
      title={translate('transferRate')}
      content={
        <Typography variant="body1" fontWeight="500">
          {normalizeTransferRate(transferRate)}
        </Typography>
      }
      {...rest}
    />
  );
}

export default TransferRateInfoDisplay;
