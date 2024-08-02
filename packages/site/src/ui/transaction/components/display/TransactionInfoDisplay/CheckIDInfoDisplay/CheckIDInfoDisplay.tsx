import { Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

export interface CheckIDInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  checkId: string;
}

function CheckIDInfoDisplay({ className, checkId, ...rest }: CheckIDInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('CheckIDInfoDisplay', className)}
      title={translate('checkID')}
      content={
        <Typography variant="body1" fontWeight="500">
          {checkId}
        </Typography>
      }
      {...rest}
    />
  );
}

export default CheckIDInfoDisplay;
