import { Hash } from '@peersyst/react-components';
import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';

export interface HashInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  hash: string;
  label: string;
}

function HashInfoDisplay({ className, hash, label, ...rest }: HashInfoDisplayProps) {
  return (
    <InfoDisplay
      className={clsx('HashInfoDisplay', className)}
      title={label}
      content={<Hash length={13} hash={hash} variant="body1" fontWeight="500" showCopyIcon />}
      {...rest}
    />
  );
}

export default HashInfoDisplay;
