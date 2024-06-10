import { Fragment, useState } from 'react';
import useWalletState from 'ui/adapter/state/useWalletState';
import ReceiveModal from 'ui/transaction/container/ReceiveModal/ReceiveModal';

import Button from '../../../common/components/input/Button/Button';
import { useTranslate } from '../../../locale';

export default function ReceiveModalButton() {
  const translate = useTranslate();
  const [modalOpen, setModalOpen] = useState(false);
  const { address } = useWalletState();
  return (
    <Fragment>
      <Button disabled={!address} variant="secondary" onClick={() => setModalOpen(true)}>
        {translate('receive')}
      </Button>
      <ReceiveModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Fragment>
  );
}
