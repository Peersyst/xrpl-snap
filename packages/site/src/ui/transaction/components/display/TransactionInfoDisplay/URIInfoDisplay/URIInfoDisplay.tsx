import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import HashInfoDisplay from '../common/HashInfoDisplay/HashInfoDisplay';

export interface URIInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  uri: string;
}

function URIInfoDisplay({ className, uri, ...rest }: URIInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return <HashInfoDisplay className={clsx('URIInfoDisplay', className)} label={translate('uri')} hash={uri} {...rest} />;
}

export default URIInfoDisplay;
