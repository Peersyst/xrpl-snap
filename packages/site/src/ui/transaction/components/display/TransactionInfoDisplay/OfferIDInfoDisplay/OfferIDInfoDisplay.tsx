import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import HashInfoDisplay from '../common/HashInfoDisplay/HashInfoDisplay';

export interface OfferIDInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  offerID: string;
}

function OfferIDInfoDisplay({ className, offerID, ...rest }: OfferIDInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return <HashInfoDisplay className={clsx('OfferIDInfoDisplay', className)} label={translate('offerID')} hash={offerID} {...rest} />;
}

export default OfferIDInfoDisplay;
