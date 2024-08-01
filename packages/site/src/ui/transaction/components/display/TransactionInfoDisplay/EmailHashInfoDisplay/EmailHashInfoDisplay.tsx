import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

import EmailHashInfoDisplayContent from './EmailHashInfoDisplayContent';

export interface EmailHashInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  emailHash: string;
}

function EmailHashInfoDisplay({ className, emailHash, ...rest }: EmailHashInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('EmailHashInfoDisplay', className)}
      title={translate('emailHash')}
      content={<EmailHashInfoDisplayContent emailHash={emailHash} />}
      {...rest}
    />
  );
}

export default EmailHashInfoDisplay;
