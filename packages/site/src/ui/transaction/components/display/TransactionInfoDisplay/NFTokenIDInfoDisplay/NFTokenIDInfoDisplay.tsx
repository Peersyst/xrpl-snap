import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import HashInfoDisplay from '../common/HashInfoDisplay/HashInfoDisplay';

export interface NFTokenIDInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  NFTokenID: string;
}

function NFTokenIDInfoDisplay({ className, NFTokenID, ...rest }: NFTokenIDInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return <HashInfoDisplay className={clsx('NFTokenIDInfoDisplay', className)} label={translate('NFTokenID')} hash={NFTokenID} {...rest} />;
}

export default NFTokenIDInfoDisplay;
