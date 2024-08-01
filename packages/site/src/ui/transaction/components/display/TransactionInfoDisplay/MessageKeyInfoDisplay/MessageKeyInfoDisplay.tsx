import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

import MessageKeyInfoDisplayContent from './MessageKeyInfoDisplayContent';

export interface MessageKeyInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  messageKey: string;
}

function MessageKeyInfoDisplay({ className, messageKey, ...rest }: MessageKeyInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('MessageKeyInfoDisplay', className)}
      title={translate('messageKey')}
      content={<MessageKeyInfoDisplayContent messageKey={messageKey} />}
      {...rest}
    />
  );
}

export default MessageKeyInfoDisplay;
