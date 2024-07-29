import { Fragment, useState } from 'react';
import useSnapState from 'ui/adapter/state/useSnapState';
import { ReviewTransactionRoutes } from 'ui/review-transaction/router/ReviewTransactionRoutes.types';
import useRouteMatch from 'ui/router/hooks/useRouteMatch';
import AccountInfoModal from 'ui/wallet/containers/AccountInfoModal/AccountInfoModal';

import ConnectSnapModal from '../ConnectSnapModal/ConnectSnapModal';
import InstallMetamaskModal from '../InstallMetamaskModal/InstallMetamaskModal';

const ROUTES_WITHOUT_SNAP = [ReviewTransactionRoutes.MAIN];

function SnapModals() {
  const showSnapModals = useRouteMatch(ROUTES_WITHOUT_SNAP) === null;
  const { isMetamaskInstalled, isSnapInstalled } = useSnapState();
  const [showAccountModal, setShowAccountModal] = useState(false);

  return (
    <Fragment>
      <InstallMetamaskModal closable={false} open={!isMetamaskInstalled && showSnapModals} />
      <ConnectSnapModal
        onSnapInstalled={() => setShowAccountModal(true)}
        closable={false}
        open={isMetamaskInstalled && !isSnapInstalled && showSnapModals}
      />
      <AccountInfoModal open={showAccountModal} onClose={() => setShowAccountModal(false)} />
    </Fragment>
  );
}

export default SnapModals;
