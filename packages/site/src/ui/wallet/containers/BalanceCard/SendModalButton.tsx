import { Fragment, useState } from 'react';
import useWalletState from 'ui/adapter/state/useWalletState';
import SendModal from 'ui/transaction/container/SendModal/SendModal';

import Button from '../../../common/components/input/Button/Button';
import { useTranslate } from '../../../locale';

export default function ReceiveModalButton() {
  const translate = useTranslate();
  const [modalOpen, setModalOpen] = useState(false);
  const { address } = useWalletState();

  return (
    <Fragment>
      <Button disabled={!address} variant="secondary" onClick={() => setModalOpen(true)}>
        {translate('send')}
      </Button>
      {modalOpen && <SendModal onClose={() => setModalOpen(false)} />}
    </Fragment>
  );
}
