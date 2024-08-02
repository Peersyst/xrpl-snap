import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import SimpleTextInfoDisplay from '../SimpleTextInfoDisplay/SimpleTextInfoDisplay';

export interface DestinationTagInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  destinationTag: number | string;
}

function DestinationTagInfoDisplay({ className, destinationTag, ...rest }: DestinationTagInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <SimpleTextInfoDisplay
      className={clsx('DestinationTagInfoDisplay', className)}
      label={translate('destinationTag')}
      content={String(destinationTag)}
      {...rest}
    />
  );
}

export default DestinationTagInfoDisplay;
