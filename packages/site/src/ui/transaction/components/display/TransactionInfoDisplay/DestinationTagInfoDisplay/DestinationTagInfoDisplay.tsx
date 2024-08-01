import { Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

export interface DestinationTagInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  destinationTag: number | string;
}

function DestinationTagInfoDisplay({ className, destinationTag, ...rest }: DestinationTagInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('DestinationTagInfoDisplay', className)}
      title={translate('destinationTag')}
      content={
        <Typography variant="body1" fontWeight="500">
          {destinationTag}
        </Typography>
      }
      {...rest}
    />
  );
}

export default DestinationTagInfoDisplay;
