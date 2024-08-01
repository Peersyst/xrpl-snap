import { Hash, Typography } from '@peersyst/react-components';
import { useTranslate } from 'ui/locale';

import { EmailHashInfoDisplayProps } from './EmailHashInfoDisplay';

function EmailHashInfoDisplayContent({ emailHash }: Pick<EmailHashInfoDisplayProps, 'emailHash'>): JSX.Element {
  const translate = useTranslate('transactions');
  if (emailHash === '' || Number(emailHash) === 0) {
    return (
      <Typography variant="body1" fontWeight="500">
        {translate('emailHashDeleted')}
      </Typography>
    );
  }
  return <Hash length={13} hash={emailHash} variant="body1" fontWeight="500" showCopyIcon />;
}

export default EmailHashInfoDisplayContent;
