import { Fragment, useEffect, useState } from 'react';
import InstallMetamaskModal from '../InstallMetamaskModal/InstallMetamaskModal';
import ConnectSnapModal from '../ConnectSnapModal/ConnectSnapModal';
import useSnapState from 'ui/adapter/state/useSnapState';
import AccountInfoModal from 'ui/wallet/containers/AccountInfoModal/AccountInfoModal';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';
import { DomainEvents } from 'domain/events';

function SnapModals() {
  const { isMetamaskInstalled, isSnapInstalled } = useSnapState();
  const [showAccountModal, setShowAccountModal] = useState(false);

  const address = useGetAddress();

  useEffect(() => {
    const unsubscribe = DomainEvents.network.on('onNetworkChanged', () => {
      setTimeout(() => {
        setShowAccountModal(true);
      }, 1000);
    });
    return () => {
      unsubscribe();
    };
  }, [address]);
  return (
    <Fragment>
      <InstallMetamaskModal closable={false} open={!isMetamaskInstalled} />
      <ConnectSnapModal
        onSnapInstalled={() => setShowAccountModal(true)}
        closable={false}
        open={isMetamaskInstalled && !isSnapInstalled}
      />
      <AccountInfoModal
        open={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />
    </Fragment>
  );
}

export default SnapModals;
