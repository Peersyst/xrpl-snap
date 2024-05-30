import {
  Chip,
  Col,
  Label,
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
import Balance from '../ui/common/components/display/Balance/Balance';
import AccountChip from 'ui/wallet/components/display/AccountChip';

function PlaygroundComponent({
  label,
  children,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <Col gap="1rem">
      <Typography variant="h5">{label}</Typography>
      <Row gap="2rem">{children}</Row>
    </Col>
  );
}

function Playground() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Col style={{ padding: '4rem 0' }} gap="2rem">
      <Col justifyContent="center" alignItems="center" gap="1rem">
        <Typography variant="h1" textAlign="center">
          Welcome to XRP Snap components playground 🎉
        </Typography>
        <a href="/">
          <Button size="lg">Go home</Button>
        </a>
      </Col>
      <Col
        gap={'3rem'}
        style={{
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
        }}
      >
        <PlaygroundComponent label="Typography">
          {(
            [
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'body1',
              'body2',
              'caption',
              'button',
            ] as const
          ).map((variant) => (
            <Label label={variant}>
              <Typography key={variant} variant={variant}>
                {variant}
              </Typography>
            </Label>
          ))}
          <Label label={'Light'}>
            <Typography variant="body1" fontWeight="500" light>
              Light
            </Typography>
          </Label>
        </PlaygroundComponent>
        <PlaygroundComponent label="Primary Button">
          <Button>Primary</Button>
          <Button disabled>Primary</Button>
        </PlaygroundComponent>
        <PlaygroundComponent label="Secondary Button">
          <Button variant="secondary">Secondary</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
        </PlaygroundComponent>
        <PlaygroundComponent label="TextField">
          <TextField
            style={{ width: 300 }}
            label="To"
            placeholder="Paste the recipient address here"
          />
          <TextField
            style={{ width: 300 }}
            label="To"
            validators={{ email: true }}
            placeholder="Paste the recipient address here"
          />
          <TextField
            label={'Disabled input'}
            style={{ width: 300 }}
            disabled
            placeholder="Disabled placeholder"
          />
        </PlaygroundComponent>
        <PlaygroundComponent label="NumericField">
          <NumericField
            label="Enter the amount"
            validators={{ lte: 409000 }}
            style={{ width: 300 }}
          />
        </PlaygroundComponent>
        <PlaygroundComponent label="AmountField">
          <AmountField
            label="Enter the amount"
            balance={new Amount('1000000000001', 6, 'XRP')}
            style={{ width: 300 }}
          />
        </PlaygroundComponent>
        <PlaygroundComponent label="AlertCallout">
          <AlertCallout
            type="info"
            content={
              'This account was generated with your MetaMask Secret Recovery Phrase.'
            }
          />
        </PlaygroundComponent>
        <PlaygroundComponent label="Popover">
          <Popover arrow={false}>
            <Popover.Content>Hover me</Popover.Content>
            <Popover.Popper>
              <Col>
                <Typography variant="body1" color="white">
                  Connect to XRP Snap
                </Typography>
              </Col>
            </Popover.Popper>
          </Popover>
        </PlaygroundComponent>
        <PlaygroundComponent label="Modal">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            closable={true}
            title={'Connect to XRP Snap'}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <Col gap="1.5rem">
              <Typography variant="body1" light>
                If you don’t have the XRP Snap installed you will be prompted to
                install it.
              </Typography>
              <AlertCallout
                type="info"
                content={
                  <Typography variant="body1" light>
                    Snaps extend the capabilities of MetaMask by adding new
                    functionalities. This Snap allows MetaMask to be compatible
                    with XRP and manage your keys.
                  </Typography>
                }
              />
              <Button fullWidth>Connect with metamask</Button>
            </Col>
          </Modal>
        </PlaygroundComponent>
        <PlaygroundComponent label="Card">
          <Card style={{ padding: 20 }}>
            <Typography variant={'body1'}>Card content</Typography>
          </Card>
        </PlaygroundComponent>
        <PlaygroundComponent label="Chip">
          <Chip label="RU3x07...da52" />
          <Card style={{ padding: 20 }}>
            <Chip label="RU3x07...da52" variant="filled" />
          </Card>
        </PlaygroundComponent>
        <PlaygroundComponent label="Account Chip">
          <AccountChip address="rnGUZ6FzJyazXqkqBheSQdw7c5JfohZafv" />
        </PlaygroundComponent>
        <PlaygroundComponent label="Balance">
          <Balance balance="10" currency="XRP" variant="body2" />
          <Balance balance="10" currency="XRP" variant="body2" hidden />
        </PlaygroundComponent>
      </Col>
    </Col>
  );
}

export default Playground;
