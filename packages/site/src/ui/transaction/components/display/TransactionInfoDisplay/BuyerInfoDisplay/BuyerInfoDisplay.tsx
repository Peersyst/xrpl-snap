import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import BlockchainAddressInfoDisplay from '../common/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';

export interface BuyerInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  buyer: string;
}

function BuyerInfoDisplay({ className, buyer, ...rest }: BuyerInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <BlockchainAddressInfoDisplay className={clsx('BuyerInfoDisplay', className)} label={translate('buyer')} account={buyer} {...rest} />
  );
}

export default BuyerInfoDisplay;
