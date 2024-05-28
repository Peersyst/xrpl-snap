import { Col, Row, TextField, Typography } from '@peersyst/react-components';
import type { ReactNode } from 'react';

import Button from '../ui/common/components/input/Button/Button';
import NumericField from '../ui/common/components/input/NumericField/NumericField';

function PlaygroundComponent({
  label,
  children,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <Col gap="1rem">
      <Typography variant="heading">{label}</Typography>
      <Row>{children}</Row>
    </Col>
  );
}

function Playground() {
  return (
    <Col gap={'3rem'} style={{ marginTop: '4rem', padding: '0 10rem' }}>
      <Row justifyContent="center" alignItems="center" gap="1rem">
        <Typography variant="heading" textAlign="center">
          Welcome to XRP Snap components playground 🎉
        </Typography>
        <a href="/">
          <Button>Go home</Button>
        </a>
      </Row>
      <PlaygroundComponent label="Button">
        <Button>Click me</Button>
      </PlaygroundComponent>
      <PlaygroundComponent label="NumericField">
        <NumericField style={{ width: 150 }} />
      </PlaygroundComponent>
      <PlaygroundComponent label="TextField">
        <TextField style={{ width: 150 }} />
      </PlaygroundComponent>
    </Col>
  );
}

export default Playground;
