import clsx from 'clsx';
import { useMemo } from 'react';
import DateDisplay from 'ui/common/components/display/DateDisplay/DateDisplay';
import { DateFormat } from 'ui/common/components/display/DateDisplay/hooks/formatDate.types';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { rippleTimeToUnixTime } from 'xrpl';

export interface RippleTimeInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  label: string;
  date: number;
}

function RippleTimeInfoDisplay({ className, label, date, ...rest }: RippleTimeInfoDisplayProps) {
  const timestamp = useMemo(() => rippleTimeToUnixTime(date), [date]);

  return (
    <InfoDisplay
      className={clsx('RippleTimeInfoDisplay', className)}
      title={label}
      content={<DateDisplay format={DateFormat.DATE_TIME} date={timestamp} variant="body1" fontWeight="500" />}
      {...rest}
    />
  );
}

export default RippleTimeInfoDisplay;
