import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import BlockchainAddressInfoDisplay from '../common/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';

export interface OwnerInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  owner: string;
}

function OwnerInfoDisplay({ className, owner, ...rest }: OwnerInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <BlockchainAddressInfoDisplay className={clsx('OwnerInfoDisplay', className)} label={translate('owner')} account={owner} {...rest} />
  );
}

export default OwnerInfoDisplay;
