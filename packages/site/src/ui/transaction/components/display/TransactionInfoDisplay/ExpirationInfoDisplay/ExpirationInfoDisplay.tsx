import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import RippleTimeInfoDisplay from '../common/RippleTimeInfoDisplay/RippleTimeInfoDisplay';

export interface ExpirationInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  expiration: number;
}

function ExpirationInfoDisplay({ className, expiration, ...rest }: ExpirationInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <RippleTimeInfoDisplay
      className={clsx('ExpirationInfoDisplay', className)}
      label={translate('expiration')}
      date={expiration}
      {...rest}
    />
  );
}

export default ExpirationInfoDisplay;
