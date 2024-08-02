import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import BlockchainAddressInfoDisplay from '../common/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';

export interface SellerInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  seller: string;
}

function SellerInfoDisplay({ className, seller, ...rest }: SellerInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <BlockchainAddressInfoDisplay className={clsx('SellerInfoDisplay', className)} label={translate('seller')} account={seller} {...rest} />
  );
}

export default SellerInfoDisplay;
