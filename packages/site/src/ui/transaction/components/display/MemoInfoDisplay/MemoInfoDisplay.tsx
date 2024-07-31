import { Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';
import { Memo, convertHexToString } from 'xrpl';

export interface MemoInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  memo: Memo;
}

function MemoInfoDisplay({ className, memo, ...rest }: MemoInfoDisplayProps) {
  const translate = useTranslate('transactions');
  const data = memo.Memo.MemoData;
  return (
    <InfoDisplay
      className={clsx('MemoInfoDisplay', className)}
      title={translate('memo')}
      content={
        <Typography variant="body1" fontWeight="500">
          {data ? convertHexToString(data) : 'Unknown'}
        </Typography>
      }
      {...rest}
    />
  );
}

export default MemoInfoDisplay;
