import BaseAccountModal from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal';
import { useTranslate } from '../../../locale';
import { BaseAccountModalProps } from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal.types';

interface AccountDetailsModalProps extends BaseAccountModalProps {
  address: string;
}

function ReceiveModal({ address, ...rest }: AccountDetailsModalProps) {
  const translate = useTranslate();
  return (
    <BaseAccountModal
      title={translate('receive')}
      address={address}
      {...rest}
    />
  );
}

export default ReceiveModal;
