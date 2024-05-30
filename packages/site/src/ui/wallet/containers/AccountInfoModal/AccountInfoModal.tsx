import { Col, useTheme } from '@peersyst/react-components';
import Modal from '../../../common/components/feedback/Modal/Modal';
import { ModalProps } from '../../../common/components/feedback/Modal/Modal.types';
import AlertCallout from '../../../common/components/feedback/AlertCallout/AlertCallout';
import Button from '../../../common/components/input/Button/Button';
import { useTranslate } from '../../../locale';
import InfoDisplay from '../../../common/components/display/InfoDisplay/InfoDisplay';

function AccountInfoModal({ ...rest }: ModalProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  return (
    <Modal {...rest} title={translate('accountInfo')}>
      <Col gap={spacing[6]}>
        <InfoDisplay title={translate('network')} content="Peersyst Testnet" />
        <InfoDisplay
          title={translate('xrpAccount')}
          content="0Lb00r7sAHTd9CgdQo0HTMTkV8LK4ZnX71"
        />
        <AlertCallout type="info" content={translate('accountInfoCallout')} />
        <Button fullWidth variant="primary">
          {translate('okGotIt')}
        </Button>
      </Col>
    </Modal>
  );
}

export default AccountInfoModal;