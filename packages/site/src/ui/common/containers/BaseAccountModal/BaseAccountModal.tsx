import { Col, Row, useTheme } from '@peersyst/react-components';
import { BaseAccountModalProps } from './BaseAccountModal.types';
import Modal from '../../components/feedback/Modal/Modal';
import Card from '../../components/surface/Card/Card';
import AccountChip from '../../../wallet/components/display/AccountChip';
import QrCode from '../../components/display/QrCode/QrCode';

function BaseAccountModal({ address, footer, ...rest }: BaseAccountModalProps) {
  const { spacing, palette } = useTheme();
  return (
    <Modal {...rest}>
      <Col gap={spacing[6]}>
        <Card css={{ width: '100%' }}>
          <Col gap={spacing[4]} alignItems="center">
            <QrCode value={address} />
            <AccountChip address={address} variant="filled" />
          </Col>
        </Card>
        {footer}
      </Col>
    </Modal>
  );
}

export default BaseAccountModal;
