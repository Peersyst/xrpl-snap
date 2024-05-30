import { Col, Row, Typography, useTheme } from '@peersyst/react-components';
import Modal from '../../components/feedback/Modal/Modal';
import { ModalProps } from '../../components/feedback/Modal/Modal.types';
import AlertCallout from '../../components/feedback/AlertCallout/AlertCallout';
import Button from '../../components/input/Button/Button';
import { useTranslate } from '../../../locale';

function ConnectSnapModal({ ...rest }: ModalProps) {
  const { spacing} = useTheme();
  const translate = useTranslate();
  return (
    <Modal {...rest} title={translate('connectSnapTitle')} subtitle={translate('connectSnapSubtitle')} >
      <Col gap={spacing[6]}>
        <AlertCallout type="info" content={
          <Col gap={spacing[2]}>
            <Typography variant="body1">{translate('snapQuestion')}</Typography>
            <Typography variant="body1" light>{translate('snapAnswer')}</Typography>
          </Col>
        } />
        <Button fullWidth variant="primary">{translate('connectWithMetamask')}</Button>
      </Col>
    </Modal>
  );
}

export default ConnectSnapModal;
