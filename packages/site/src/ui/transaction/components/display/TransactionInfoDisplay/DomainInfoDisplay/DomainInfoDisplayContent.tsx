import { Typography } from '@peersyst/react-components';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import { useTranslate } from 'ui/locale';
import { convertHexToString } from 'xrpl';

import { DomainInfoDisplayProps } from './DomainInfoDisplay';

function DomainInfoDisplayContent({ domain }: Pick<DomainInfoDisplayProps, 'domain'>) {
  const translate = useTranslate('transactions');

  if (domain === '') {
    return (
      <Typography variant="body1" fontWeight="500">
        {translate('domainDeleted')}
      </Typography>
    );
  }
  const parsedDomain = convertHexToString(domain);
  return <ExternalLink to={parsedDomain}>{parsedDomain}</ExternalLink>;
}

export default DomainInfoDisplayContent;
