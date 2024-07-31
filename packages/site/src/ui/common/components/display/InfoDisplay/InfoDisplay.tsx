import { Col, Row, Skeleton, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { ReactElement } from 'react';

import VerticalLine from '../VerticalLine/VerticalLine';

export type InfoDisplayProps = {
  className?: string;
  style?: React.CSSProperties;
  title: string;
  content?: string | ReactElement;
};

function InfoDisplay({ className, title, content, ...rest }: InfoDisplayProps) {
  return (
    <Row gap="1rem" className={clsx('InfoDisplay', className)} {...rest}>
      <VerticalLine />
      <Col gap="0.5rem" justifyContent="center">
        <Typography variant="body1" light>
          {title}
        </Typography>
        <Skeleton loading={!content}>
          {typeof content === 'string' ? (
            <Typography variant="body1" fontWeight="500">
              {content}
            </Typography>
          ) : (
            content
          )}
        </Skeleton>
      </Col>
    </Row>
  );
}

export default InfoDisplay;
