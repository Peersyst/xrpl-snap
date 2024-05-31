import { Fragment } from 'react';
import InstallMetamaskModal from '../InstallMetamaskModal/InstallMetamaskModal';
import ConnectSnapModal from '../ConnectSnapModal/ConnectSnapModal';
import useSnapState from 'ui/adapter/state/useSnapState';

function SnapModals() {
  const { isMetamaskInstalled, isSnapInstalled } = useSnapState();

  return (
    <Fragment>
      <InstallMetamaskModal open={!isMetamaskInstalled} />
      <ConnectSnapModal open={isMetamaskInstalled && !isSnapInstalled} />
    </Fragment>
  );
}

export default SnapModals;
