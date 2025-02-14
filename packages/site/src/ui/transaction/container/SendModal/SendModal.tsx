import { useControlled } from '@peersyst/react-hooks';
import type { SendParams } from 'common/models/transaction/send.types';
import Modal from 'ui/common/components/feedback/Modal/Modal';
import type { ModalProps } from 'ui/common/components/feedback/Modal/Modal.types';
import { useTranslate } from 'ui/locale';
import useSend from 'ui/transaction/query/useSend';

import { SendModalError, SendModalLoading, SendModalSuccess } from './SendModalFeedback';
import { SendModalForm } from './SendModalForm';

function SendModal({ defaultOpen, open: openProp, onClose, ...rest }: Omit<ModalProps, 'title'>) {
  const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);
  const translate = useTranslate();
  const { mutate, isPending, isSuccess, isError, error, data: txHash = '', reset } = useSend();

  function closeModal() {
    setOpen(false);
    reset();
  }

  function handleSubmit({ destinationTag, ...rest }: SendParams) {
    const sendParams: SendParams = { ...rest };
    if (destinationTag) {
      sendParams.destinationTag = Number(destinationTag);
    }
    mutate(sendParams);
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
