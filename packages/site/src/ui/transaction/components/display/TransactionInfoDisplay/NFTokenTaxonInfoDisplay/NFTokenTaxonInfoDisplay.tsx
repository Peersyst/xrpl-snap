import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import HashInfoDisplay from '../common/HashInfoDisplay/HashInfoDisplay';

export interface NFTokenTaxonInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  NFTokenTaxon: number;
}

function NFTokenTaxonInfoDisplay({ className, NFTokenTaxon, ...rest }: NFTokenTaxonInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <HashInfoDisplay
      className={clsx('NFTokenTaxonInfoDisplay', className)}
      label={translate('NFTokenTaxon')}
      hash={NFTokenTaxon.toString()}
      {...rest}
    />
  );
}

export default NFTokenTaxonInfoDisplay;
