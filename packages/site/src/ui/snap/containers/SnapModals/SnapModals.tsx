import { Fragment } from 'react';
import InstallMetamaskModal from '../InstallMetamaskModal/InstallMetamaskModal';
import ConnectSnapModal from '../ConnectSnapModal/ConnectSnapModal';
import useSnapState from 'ui/adapter/state/useSnapState';

function SnapModals() {
  const { isMetamaskInstalled, isSnapInstalled } = useSnapState();

  return (
    <Fragment>
      <InstallMetamaskModal closable={false} open={!isMetamaskInstalled} />
      <ConnectSnapModal
        closable={false}
        open={isMetamaskInstalled && !isSnapInstalled}
      />
    </Fragment>
  );
}

export default SnapModals;
