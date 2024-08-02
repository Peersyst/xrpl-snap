import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import BlockchainAddressInfoDisplay from '../common/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';

export interface AMMAccountIDInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  accountId: string;
}

function AMMAccountIDInfoDisplay({ className, accountId, ...rest }: AMMAccountIDInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <BlockchainAddressInfoDisplay
      className={clsx('AMMAccountIDInfoDisplay', className)}
      label={translate('ammAccountID')}
      account={accountId}
      {...rest}
    />
  );
}

export default AMMAccountIDInfoDisplay;
