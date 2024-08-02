import { Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { normalizeNftTransferFee } from 'common/utils/xrpl/nft';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

export interface TransferFeeInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  transferFee: number;
}

function TransferFeeInfoDisplay({ className, transferFee, ...rest }: TransferFeeInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('TransferFeeInfoDisplay', className)}
      title={translate('transferFee')}
      content={
        <Typography variant="body1" fontWeight="500">
          {normalizeNftTransferFee(transferFee)}
        </Typography>
      }
      {...rest}
    />
  );
}

export default TransferFeeInfoDisplay;
