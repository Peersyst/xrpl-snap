import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

import DomainInfoDisplayContent from './DomainInfoDisplayContent';

export interface DomainInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  domain: string;
}

function DomainInfoDisplay({ className, domain, ...rest }: DomainInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('DomainInfoDisplay', className)}
      title={translate('domain')}
      content={<DomainInfoDisplayContent domain={domain} />}
      {...rest}
    />
  );
}

export default DomainInfoDisplay;
