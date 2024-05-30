import { Row, Typography, useTranslate } from '@peersyst/react-components';
import clsx from 'clsx';

export interface NothingToShowProps {
  className?: string;
  style?: React.CSSProperties;
  message?: string;
}

function NothingToShow({ className, message, ...rest }: NothingToShowProps) {
  const translate = useTranslate();

  return (
    <Row
      className={clsx('NothingToShow', className)}
      justifyContent="center"
      {...rest}
    >
      <Typography variant="body1" fontWeight={500} light textAlign="center">
        {message ?? translate('nothingToShow')}
      </Typography>
    </Row>
  );
}

export default NothingToShow;
