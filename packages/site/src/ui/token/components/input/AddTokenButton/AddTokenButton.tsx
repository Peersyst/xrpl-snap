import { Col, Row } from '@peersyst/react-components';
import { useState } from 'react';
import { PlusIcon } from 'ui/common/icons';
import AddTokenModal from 'ui/token/containers/AddTokenModal/AddTokenModal';

import { useTranslate } from '../../../../locale';
import { AddTokenButtonRoot, AddTokenButtonIcon } from './AddTokenButton.styles';

function AddTokenButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const translate = useTranslate();
  return (
    <Col alignItems="center">
      <AddTokenButtonRoot variant="text" onClick={() => setModalOpen(true)} fullWidth>
        <Row justifyContent="center" alignItems="center" gap="1.25rem">
          <AddTokenButtonIcon size={'lg'} Icon={PlusIcon} />
          {translate('addToken')}
        </Row>
      </AddTokenButtonRoot>
      {modalOpen && <AddTokenModal onClose={() => setModalOpen(false)} />}
    </Col>
  );
}

export default AddTokenButton;
