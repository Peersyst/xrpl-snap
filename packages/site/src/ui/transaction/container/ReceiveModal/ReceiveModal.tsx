import { useConfig } from '@peersyst/react-components';
import type { ModalProps } from 'ui/common/components/feedback/Modal/Modal.types';
import { useTranslate } from 'ui/locale';
import BaseAccountModal from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';

function ReceiveModal(props: Omit<ModalProps, 'title'>) {
  const translate = useTranslate();
  const walletAddress = useGetAddress();
  const mockedAddress = useConfig('mockedAddress');
  const address = walletAddress ?? mockedAddress;

  return <BaseAccountModal title={translate('receive')} address={address} {...props} />;
}

export default ReceiveModal;
