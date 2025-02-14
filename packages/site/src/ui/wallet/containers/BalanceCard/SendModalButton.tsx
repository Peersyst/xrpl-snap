import { Fragment, useState } from 'react';
import Button from 'ui/common/components/input/Button/Button';
import { useTranslate } from 'ui/locale';
import SendModal from 'ui/transaction/container/SendModal/SendModal';

export default function SendModalButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const translate = useTranslate();

  return (
    <Fragment>
      <Button onClick={() => setModalOpen(true)} variant="primary" fullWidth>
        {translate('send')}
      </Button>
      <SendModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Fragment>
  );
}
