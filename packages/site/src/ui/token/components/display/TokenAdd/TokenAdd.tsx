import { Col, Row } from '@peersyst/react-components';
import { useState } from 'react';
import { PlusIcon } from 'ui/common/icons';
import AddTokenModal from 'ui/token/containers/AddTokenModal/AddTokenModal';

import { useTranslate } from '../../../../locale';
import { ButtonRoot, TokenAddIcon } from './TokenAdd.styles';

function TokenAdd() {
  const [modalOpen, setModalOpen] = useState(false);
  const translate = useTranslate();
  return (
    <Col alignItems="center">
      <ButtonRoot variant="text" onClick={() => setModalOpen(true)} fullWidth>
        <Row justifyContent="center" alignItems="center" gap="1.25rem">
          <TokenAddIcon size={'lg'} Icon={PlusIcon} />
          {translate('addToken')}
        </Row>
      </ButtonRoot>
      {modalOpen && <AddTokenModal onClose={() => setModalOpen(false)} />}
    </Col>
  );
}

export default TokenAdd;
