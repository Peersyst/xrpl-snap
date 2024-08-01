import { Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

export interface TickSizeInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  tickSize: number;
}

function TickSizeInfoDisplay({ className, tickSize, ...rest }: TickSizeInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('TickSizeInfoDisplay', className)}
      title={translate('destinationTag')}
      content={
        <Typography variant="body1" fontWeight="500">
          {tickSize}
        </Typography>
      }
      {...rest}
    />
  );
}

export default TickSizeInfoDisplay;
