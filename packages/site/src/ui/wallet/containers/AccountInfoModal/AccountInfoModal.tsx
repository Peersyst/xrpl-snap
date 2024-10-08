import { Col, useTheme } from '@peersyst/react-components';
import { useControlled } from '@peersyst/react-hooks';
import NetworkInfoDisplay from 'ui/network/containers/NetworkInfoDisplay/NetworkInfoDisplay';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';

import InfoDisplay from '../../../common/components/display/InfoDisplay/InfoDisplay';
import AlertCallout from '../../../common/components/feedback/AlertCallout/AlertCallout';
import Modal from '../../../common/components/feedback/Modal/Modal';
import type { ModalProps } from '../../../common/components/feedback/Modal/Modal.types';
import Button from '../../../common/components/input/Button/Button';
import { useTranslate } from '../../../locale';

function AccountInfoModal({ defaultOpen, open: openProp, onClose, ...rest }: ModalProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);
  const address = useGetAddress();

  return (
    <Modal open={open} onClose={() => setOpen(false)} {...rest} title={translate('accountInfo')}>
      <Col gap={spacing[6]}>
        <NetworkInfoDisplay />
        <InfoDisplay title={translate('xrpAccount')} content={address || ''} />
        <AlertCallout type="info" content={translate('accountInfoCallout')} />
        <Button fullWidth variant="primary" onClick={() => setOpen(false)}>
          {translate('okGotIt')}
        </Button>
      </Col>
    </Modal>
  );
}

export default AccountInfoModal;
