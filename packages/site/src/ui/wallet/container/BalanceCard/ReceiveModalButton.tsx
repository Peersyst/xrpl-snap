import { useTranslate } from '../../../locale';
import Button from '../../../common/components/input/Button/Button';
import { Fragment, useState } from 'react';
import ReceiveModal from 'ui/transaction/container/ReceiveModal/ReceiveModal';

export default function ReceiveModalButton() {
  const translate = useTranslate();
  const [modalOpen, setModalOpen] = useState(false);
  const address = 'raQwCVAJVqjrVm1Nj5SFRcX8i22BhdC9WA';
  return (
    <Fragment>
      <Button variant="secondary" onClick={() => setModalOpen(true)}>
        {translate('receive')}
      </Button>
      <ReceiveModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        address={address}
      />
    </Fragment>
  );
}
