import { Fragment, useState } from 'react';
import useSnapState from 'ui/adapter/state/useSnapState';
import AccountInfoModal from 'ui/wallet/containers/AccountInfoModal/AccountInfoModal';

import ConnectSnapModal from '../ConnectSnapModal/ConnectSnapModal';
import InstallMetamaskModal from '../InstallMetamaskModal/InstallMetamaskModal';

function SnapModals() {
  const { isMetamaskInstalled, isSnapInstalled } = useSnapState();
  const [showAccountModal, setShowAccountModal] = useState(false);

  return (
    <Fragment>
      <InstallMetamaskModal closable={false} open={!isMetamaskInstalled} />
      <ConnectSnapModal onSnapInstalled={() => setShowAccountModal(true)} closable={false} open={isMetamaskInstalled && !isSnapInstalled} />
      <AccountInfoModal open={showAccountModal} onClose={() => setShowAccountModal(false)} />
    </Fragment>
  );
}

export default SnapModals;
