import { Col, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { useState } from 'react';
import Button from 'ui/common/components/input/Button/Button';
import IconCard from 'ui/common/components/surface/IconCard/IconCard';
import { LockIcon } from 'ui/common/icons';
import { useTranslate } from 'ui/locale';

import ActivateAccountModal from '../ActivateAccountModal/ActivateAccountModal';
import { AccountNotActiveRoot } from './AccountNotActive.styles';

export interface AccountNotActiveProps {
  className?: string;
  style?: React.CSSProperties;
}

function AccountNotActive({ className, ...rest }: AccountNotActiveProps) {
  const translate = useTranslate();
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <AccountNotActiveRoot alignItems="center" className={clsx('AccountNotActive', className)} {...rest}>
        <IconCard Icon={LockIcon} />
        <Col gap="1rem">
          <Typography variant="h3" textAlign="center">
            {translate('accountNotActiveTitle')}
          </Typography>
          <Typography variant="body1" light textAlign="center">
            {translate('accountNotActiveText')}
          </Typography>
        </Col>
        <Button onClick={() => setModalOpened(true)} variant="primary">
          {translate('accountNotActiveCTA')}
        </Button>
      </AccountNotActiveRoot>
      <ActivateAccountModal open={modalOpened} onClose={() => setModalOpened(false)} />
    </>
  );
}

export default AccountNotActive;
