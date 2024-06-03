import {
  Col,
  Row,
  Typography,
  useConfig,
  Image,
  useTheme,
} from '@peersyst/react-components';
import Modal from 'ui/common/components/feedback/Modal/Modal';
import { ModalProps } from 'ui/common//components/feedback/Modal/Modal.types';
import AlertCallout from 'ui/common//components/feedback/AlertCallout/AlertCallout';
import Button from 'ui/common//components/input/Button/Button';
import { useTranslate } from 'ui/locale';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import SnapLogo from 'ui/common/components/display/SnapLogo/SnapLogo';
import { metamask } from 'ui/assets/images';

function InstallMetamaskModal({ ...rest }: ModalProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();

  const metamaskInstallationLink = useConfig('metamaskInstallationLink');
  return (
    <Modal
      {...rest}
      title={translate('installMetamaskExtension')}
      subtitle={translate('installMetamaskExtensionDescription')}
    >
      <Col gap={spacing[6]}>
        <AlertCallout
          type="info"
          content={
            <Col gap={spacing[2]}>
              <Typography variant="body1">
                {translate('installMetamaskExtensionExplanation')}
              </Typography>
            </Col>
          }
        />
        <ExternalLink to={metamaskInstallationLink}>
          <Button fullWidth>
            <Row gap="0.5rem" alignItems="center">
              <Image
                css={{ width: '1.5rem' }}
                src={metamask}
                alt="MetaMask Logo"
              />
              {translate('installMetamask')}
            </Row>
          </Button>
        </ExternalLink>
      </Col>
    </Modal>
  );
}

export default InstallMetamaskModal;
