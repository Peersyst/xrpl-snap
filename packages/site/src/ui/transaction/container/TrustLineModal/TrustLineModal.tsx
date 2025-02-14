import Modal from 'ui/common/components/feedback/Modal/Modal';
import { useTranslate } from 'ui/locale';

import TrustLineModalForm from './TrustLineModalForm';

export interface TrustLineModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TrustLineModal({ open, onClose }: TrustLineModalProps) {
  const translate = useTranslate();

  return (
    <Modal title={translate('addTrustLine')} open={open} onClose={onClose}>
      <TrustLineModalForm onClose={onClose} />
    </Modal>
  );
}
