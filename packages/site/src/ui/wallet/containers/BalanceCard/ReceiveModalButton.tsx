import { Fragment, useState } from 'react';
import Button from 'ui/common/components/input/Button/Button';
import { useTranslate } from 'ui/locale';
import ReceiveModal from 'ui/transaction/container/ReceiveModal/ReceiveModal';

export default function ReceiveModalButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const translate = useTranslate();

  return (
    <Fragment>
      <Button onClick={() => setModalOpen(true)} variant="secondary" fullWidth>
        {translate('receive')}
      </Button>
      <ReceiveModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Fragment>
  );
}
