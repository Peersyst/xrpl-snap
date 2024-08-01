import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import BlockchainAddressInfoDisplay from '../BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';

export interface DestinationInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  destination: string;
}

function DestinationInfoDisplay({ className, destination, ...rest }: DestinationInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <BlockchainAddressInfoDisplay
      className={clsx('DestinationInfoDisplay', className)}
      label={translate('destination')}
      account={destination}
      {...rest}
    />
  );
}

export default DestinationInfoDisplay;
