import { Fragment, useState } from 'react';
import useSnapState from 'ui/adapter/state/useSnapState';
import GiveAwayModal from 'ui/giveaway/containers/GiveAwayModal/GiveAwayModal';
import { ReviewTransactionRoutes } from 'ui/review-transaction/router/ReviewTransactionRoutes.types';
import useRouteMatch from 'ui/router/hooks/useRouteMatch';
import AccountInfoModal from 'ui/wallet/containers/AccountInfoModal/AccountInfoModal';

import ConnectSnapModal from '../ConnectSnapModal/ConnectSnapModal';
import InstallMetaMaskModal from '../InstallMetaMaskModal/InstallMetaMaskModal';

const ROUTES_WITHOUT_SNAP = [ReviewTransactionRoutes.MAIN];

function SnapModals() {
  const showSnapModals = useRouteMatch(ROUTES_WITHOUT_SNAP) === null;
  const { isMetaMaskInstalled, isSnapInstalled } = useSnapState();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showGiveAwayModal, setShowGiveAwayModal] = useState(false);

  function handleOnAccountModalClose() {
    setShowAccountModal(false);
    setTimeout(() => setShowGiveAwayModal(true), 500);
  }

  return (
    <Fragment>
      <InstallMetaMaskModal closable={false} open={!isMetaMaskInstalled && showSnapModals} />
      <ConnectSnapModal
        onSnapInstalled={() => setShowAccountModal(true)}
        closable={false}
        open={isMetaMaskInstalled && !isSnapInstalled && showSnapModals}
      />
      <AccountInfoModal open={showAccountModal} onClose={handleOnAccountModalClose} />
      <GiveAwayModal open={showGiveAwayModal} onClose={() => setShowGiveAwayModal(false)} />
    </Fragment>
  );
}

export default SnapModals;
