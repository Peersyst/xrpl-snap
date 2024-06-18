import { Col, Typography, useTheme } from '@peersyst/react-components';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import Modal from 'ui/common/components/feedback/Modal/Modal';
import type { ModalProps } from 'ui/common/components/feedback/Modal/Modal.types';
import Button from 'ui/common/components/input/Button/Button';
import { useTranslate } from 'ui/locale';

import useInstallSnap from '../../queries/useInstallSnap';

function ConnectSnapModal({ onSnapInstalled, ...rest }: ModalProps & { onSnapInstalled: () => void }) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  const { mutate } = useInstallSnap({ onSuccess: onSnapInstalled });

  return (
    <Modal {...rest} title={translate('connectSnapTitle')} subtitle={translate('connectSnapSubtitle')}>
      <Col gap={spacing[6]}>
        <AlertCallout
          type="info"
          content={
            <Col gap={spacing[2]}>
              <Typography variant="body1">{translate('snapQuestion')}</Typography>
              <Typography variant="body1" light>
                {translate('snapAnswer')}
              </Typography>
            </Col>
          }
        />
        <Button fullWidth variant="primary" onClick={() => mutate()}>
          {translate('connectWithMetamask')}
        </Button>
      </Col>
    </Modal>
  );
}

export default ConnectSnapModal;
