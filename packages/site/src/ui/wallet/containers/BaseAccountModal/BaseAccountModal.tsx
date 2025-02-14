import { Col, useTheme } from '@peersyst/react-components';

import QrCode from '../../../common/components/display/QrCode/QrCode';
import Modal from '../../../common/components/feedback/Modal/Modal';
import Card from '../../../common/components/surface/Card/Card';
import AccountChip from '../../components/display/AccountChip';
import type { BaseAccountModalProps } from './BaseAccountModal.types';

function BaseAccountModal({ address, footer, children, title, ...rest }: BaseAccountModalProps) {
  const { spacing } = useTheme();
  return (
    <Modal alignTitle="center" title={title} {...rest}>
      <Col gap={spacing[6]}>
        <Card css={{ width: '100%' }}>
          <Col gap={spacing[4]} alignItems="center">
            <QrCode value={address} />
            <AccountChip address={address} variant="filled" />
          </Col>
        </Card>
        {children}
        {footer}
      </Col>
    </Modal>
  );
}

export default BaseAccountModal;
