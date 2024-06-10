import { useControlled } from '@peersyst/react-hooks';
import type { SendParams } from 'common/models/transaction/send.types';
import Modal from 'ui/common/components/feedback/Modal/Modal';
import useSend from 'ui/transaction/query/useSend';
import type { BaseAccountModalProps } from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal.types';

import { useTranslate } from '../../../locale';
import { SendModalError, SendModalLoading, SendModalSuccess } from './SendModalFeedback';
import { SendModalForm } from './SendModalForm';

function SendModal({ defaultOpen, open: openProp, onClose, ...rest }: Omit<BaseAccountModalProps, 'address'>) {
  const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);

  const { mutate, isPending, isSuccess, isError, error, data: txHash = '' } = useSend();

  function closeModal() {
    setOpen(false);
  }

  const translate = useTranslate();

  function handleSubmit(params: SendParams) {
    mutate(params);
  }

  return (
    <Modal closable={!isPending} open={open} onClose={closeModal} title={translate('send')} {...rest}>
      {isPending && <SendModalLoading />}
      {!isPending && !isSuccess && !isError && <SendModalForm onSubmit={handleSubmit} onCancel={closeModal} />}
      {isSuccess && <SendModalSuccess txHash={txHash} onClose={closeModal} />}
      {isError && <SendModalError error={error} onClose={closeModal} />}
    </Modal>
  );
}

export default SendModal;
