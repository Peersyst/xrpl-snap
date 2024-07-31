import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import BlockchainAddressInfoDisplay from '../BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';

export interface FromInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  from: string;
}

function FromInfoDisplay({ className, from, ...rest }: FromInfoDisplayProps) {
  const translate = useTranslate();

  return <BlockchainAddressInfoDisplay className={clsx('FromInfoDisplay', className)} label={translate('from')} account={from} {...rest} />;
}

export default FromInfoDisplay;
