import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

import RegularKeyInfoDisplayContent from './RegularKeyDisplayContent';

export interface RegularKeyInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  regularKey?: string;
}

function RegularKeyInfoDisplay({ className, regularKey, ...rest }: RegularKeyInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('RegularKeyInfoDisplay', className)}
      title={translate('regularKey')}
      content={<RegularKeyInfoDisplayContent regularKey={regularKey} />}
      {...rest}
    />
  );
}

export default RegularKeyInfoDisplay;
