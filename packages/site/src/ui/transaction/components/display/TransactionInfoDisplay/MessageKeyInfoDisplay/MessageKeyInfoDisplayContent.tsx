import { Hash, Typography } from '@peersyst/react-components';
import { useTranslate } from 'ui/locale';

import { MessageKeyInfoDisplayProps } from './MessageKeyInfoDisplay';

function MessageKeyInfoDisplayContent({ messageKey }: Pick<MessageKeyInfoDisplayProps, 'messageKey'>): JSX.Element {
  const translate = useTranslate('transactions');
  if (messageKey === '') {
    return (
      <Typography variant="body1" fontWeight="500">
        {translate('messageKeyDeleted')}
      </Typography>
    );
  }
  return <Hash length={13} hash={messageKey} variant="body1" fontWeight="500" showCopyIcon />;
}

export default MessageKeyInfoDisplayContent;
