import { Fragment, useState } from 'react';
import Button from 'ui/common/components/input/Button/Button';
import { useTranslate } from 'ui/locale';
import TrustLineModal from 'ui/transaction/container/TrustLineModal/TrustLineModal';

export default function TrustLineButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const translate = useTranslate();

  return (
    <Fragment>
      <Button onClick={() => setModalOpen(true)} variant="primary">
        {translate('addTrustLine')}
      </Button>
      <TrustLineModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Fragment>
  );
}
