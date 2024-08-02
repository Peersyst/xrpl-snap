import { Hash } from '@peersyst/react-components';
import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import { useTranslate } from 'ui/locale';
import { convertHexToString } from 'xrpl';

export interface URIInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  uri: string;
}

function URIInfoDisplay({ className, uri, ...rest }: URIInfoDisplayProps) {
  const translate = useTranslate('transactions');
  const parsedURI = convertHexToString(uri);

  return (
    <InfoDisplay
      className={clsx('URIInfoDisplay', className)}
      title={translate('uri')}
      content={
        <ExternalLink to={parsedURI}>
          <Hash length={13} hash={parsedURI} variant="body1" fontWeight="500" />
        </ExternalLink>
      }
      {...rest}
    />
  );
}

export default URIInfoDisplay;
