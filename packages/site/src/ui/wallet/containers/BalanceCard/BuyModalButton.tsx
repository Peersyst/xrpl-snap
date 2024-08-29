import { NetworkChainId } from 'common/models';
import { Fragment, useState } from 'react';
import useWalletState from 'ui/adapter/state/useWalletState';
import OnRampModal from 'ui/fiat-orders/transak/containers/OnRampModal';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';

import Button from '../../../common/components/input/Button/Button';
import { useTranslate } from '../../../locale';

export default function BuyModalButton() {
  const translate = useTranslate();
  const [modalOpen, setModalOpen] = useState(false);
  const { address } = useWalletState();
  const { data: network } = useGetActiveNetwork();

  return (
    <Fragment>
      {network?.chainId === NetworkChainId.MAINNET ? (
        <Button variant="secondary" disabled={!address} onClick={() => setModalOpen(true)}>
          {translate('buy')}
        </Button>
      ) : null}
      {modalOpen && <OnRampModal open={modalOpen} onClose={() => setModalOpen(false)} />}
    </Fragment>
  );
}
