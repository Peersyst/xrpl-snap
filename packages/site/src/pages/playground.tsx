import {
  Chip,
  Col,
  Row,
  TextField,
  Typography,
} from '@peersyst/react-components';
import type { ReactNode } from 'react';

import Amount from '../common/utils/Amount';
import AmountField from '../ui/common/components/input/AmountField/AmountField';
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
      <Row gap="2rem">{children}</Row>
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
          <Button size="lg">Go home</Button>
        </a>
      </Row>
      <PlaygroundComponent label="Button">
        <Button>Click me</Button>
        <Button variant="secondary">Go home</Button>
      </PlaygroundComponent>
      <PlaygroundComponent label="NumericField">
        <NumericField style={{ width: 200 }} />
      </PlaygroundComponent>
      <PlaygroundComponent label="TextField">
        <TextField style={{ width: 200 }} />
      </PlaygroundComponent>
      <PlaygroundComponent label="AmountField">
        <AmountField
          balance={new Amount('10000001', 6, 'XRP')}
          style={{ width: 200 }}
        />
      </PlaygroundComponent>
      <PlaygroundComponent label="Chip">
        <Chip label="RU3x07...da52" />
      </PlaygroundComponent>
    </Col>
  );
}

export default Playground;
