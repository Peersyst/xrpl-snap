import {
 Chip, Col,
  Popover,
  Row,
  TextField,
  Typography,
} from '@peersyst/react-components';
import type { ReactNode } from 'react';
import { useState } from 'react';

import Amount from '../common/utils/Amount';
import AlertCallout from '../ui/common/components/feedback/AlertCallout/AlertCallout';
import Modal from '../ui/common/components/feedback/Modal/Modal';
import AmountField from '../ui/common/components/input/AmountField/AmountField';
import Button from '../ui/common/components/input/Button/Button';
import NumericField from '../ui/common/components/input/NumericField/NumericField';
import Card from '../ui/common/components/surface/Card/Card';

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
  const [modalOpen, setModalOpen] = useState(false);

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
          balance={new Amount('1000000000001', 6, 'XRP')}
          style={{ width: 200 }}
        />
      </PlaygroundComponent>
      <PlaygroundComponent label="AlertCallout">
        <AlertCallout
          type="info"
          content={'This is an info alert'}
          style={{ flex: 1 }}
        />
      </PlaygroundComponent>
      <PlaygroundComponent label="Popover">
        <Popover>
          <Popover.Content>Hover me</Popover.Content>
          <Popover.Popper>
            <AlertCallout
              type="info"
              content={'This is an info alert'}
              style={{ flex: 1 }}
            />
          </Popover.Popper>
        </Popover>
      </PlaygroundComponent>
      <PlaygroundComponent label="Modal">
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          closable={true}
          title={'Modal'}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Typography variant="body1">Content</Typography>
        </Modal>
      </PlaygroundComponent>
      <PlaygroundComponent label="Card">
        <Card style={{ padding: 20 }}>
          <Typography variant={'body1'}>Card content</Typography>
        </Card>
      </PlaygroundComponent>
      <PlaygroundComponent label="Chip">
        <Chip label="RU3x07...da52" />
      </PlaygroundComponent>
    </Col>
  );
}

export default Playground;
