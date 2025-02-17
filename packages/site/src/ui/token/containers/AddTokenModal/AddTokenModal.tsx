import { useControlled } from '@peersyst/react-hooks';
import { AddTokenParams } from 'common/models/token/add.types';
import Modal from 'ui/common/components/feedback/Modal/Modal';
import useAddToken from 'ui/transaction/query/useAddToken';
import type { BaseAccountModalProps } from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal.types';

import { useTranslate } from '../../../locale';
import { AddTokenModalError, AddTokenModalLoading } from './AddTokenModalFeedback';
import { AddTokenModalForm } from './AddTokenModalForm';

function AddTokenModal({ defaultOpen, open: openProp, onClose, ...rest }: Omit<BaseAccountModalProps, 'address'>) {
  const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);

  const { mutate, isPending, isSuccess, isError, error, data: txHash = '' } = useAddToken();

  function closeModal() {
    setOpen(false);
  }

  const translate = useTranslate();

  function handleSubmit(addToken: AddTokenParams) {
    mutate(addToken);
  }
  console.log('isSuccess', isSuccess);
  console.log('txHash', txHash);
  console.log("isSuccess && txHash !== ''", isSuccess && txHash !== '');

  return (
    <Modal closable={!isPending} open={open || !isSuccess} onClose={closeModal} title={translate('addToken')} {...rest}>
      {isPending && <AddTokenModalLoading />}
      {!isPending && !isSuccess && !isError && <AddTokenModalForm onSubmit={handleSubmit} onCancel={closeModal} />}
      {isError && <AddTokenModalError error={error} onClose={closeModal} />}
    </Modal>
  );
}

export default AddTokenModal;
