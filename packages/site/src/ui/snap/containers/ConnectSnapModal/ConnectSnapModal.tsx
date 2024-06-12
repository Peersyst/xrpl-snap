import { Col, Typography, useTheme, Image, Row } from '@peersyst/react-components';
import { css } from 'styled-components';
import { metamask } from 'ui/assets/images';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import Modal from 'ui/common/components/feedback/Modal/Modal';
import type { ModalProps } from 'ui/common/components/feedback/Modal/Modal.types';
import Button from 'ui/common/components/input/Button/Button';
import { useTranslate } from 'ui/locale';

import useInstallSnap from '../../queries/useInstallSnap';

const bounceAnimation = css`
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  &:hover img {
    animation: bounce 0.5s ease-in-out 2;
  }
`;

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
        <Button css={bounceAnimation} fullWidth variant="primary" onClick={() => mutate()}>
          <Row gap="0.5rem" alignItems="center">
            <Image css={{ width: '1.5rem' }} src={metamask} alt="MetaMask Logo" />
            {translate('connectWithMetamask')}
          </Row>
        </Button>
      </Col>
    </Modal>
  );
}

export default ConnectSnapModal;
