import BaseAccountModal from '../BaseAccountModal/BaseAccountModal';
import { useTranslate } from '../../../locale';

interface AccountDetailsModalProps {
  address: string,
}

function ReceiveModal({ address }: AccountDetailsModalProps) {
  const translate = useTranslate();
  return (
    <BaseAccountModal title={translate('receive')} address={address} />
  );
}

export default ReceiveModal;
