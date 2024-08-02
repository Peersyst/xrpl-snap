import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import BlockchainAddressInfoDisplay from '../common/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';

export interface IssuerInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  issuer: string;
}

function IssuerInfoDisplay({ className, issuer, ...rest }: IssuerInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <BlockchainAddressInfoDisplay className={clsx('IssuerInfoDisplay', className)} label={translate('issuer')} account={issuer} {...rest} />
  );
}

export default IssuerInfoDisplay;
