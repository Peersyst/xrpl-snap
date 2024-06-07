import { Col, Row, Skeleton, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import VerticalLine from '../VerticalLine/VerticalLine';

export interface InfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  title: string;
  content?: string;
}

function InfoDisplay({ className, title, content, ...rest }: InfoDisplayProps) {
  return (
    <Row
      gap="1rem"
      css={{ height: '2.75rem' }}
      className={clsx('InfoDisplay', className)}
      {...rest}
    >
      <VerticalLine />
      <Col gap="0.5rem" justifyContent="center">
        <Typography variant="body1" light>
          {title}
        </Typography>
        <Skeleton loading={!content}>
          <Typography variant="body1" fontWeight="500">
            {content ?? 'Unknown'}
          </Typography>
        </Skeleton>
      </Col>
    </Row>
  );
}

export default InfoDisplay;
