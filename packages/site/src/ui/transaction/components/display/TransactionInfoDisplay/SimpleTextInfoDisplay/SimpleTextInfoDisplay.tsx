import { Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';

export interface SimpleTextInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  label: string;
  content: string;
}

function SimpleTextInfoDisplay({ className, label, content, ...rest }: SimpleTextInfoDisplayProps) {
  return (
    <InfoDisplay
      className={clsx('SimpleTextInfoDisplay', className)}
      title={label}
      content={
        <Typography variant="body1" fontWeight="500">
          {content}
        </Typography>
      }
      {...rest}
    />
  );
}

export default SimpleTextInfoDisplay;
