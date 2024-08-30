import { useModal } from '@peersyst/react-components-core';
import { Transak } from '@transak/transak-sdk';
import { useEffect, useState } from 'react';
import useWalletState from 'ui/adapter/state/useWalletState';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { useInvalidateInfiniteQuery } from 'ui/query/hooks/useInvalidateInfiniteQuery';
import { useInvalidateQueries } from 'ui/query/hooks/useInvalidateQueries';
import { Queries } from 'ui/query/queries';

import OnRampModal from '../containers/OnRampModal';
import useTransakContext from './useTransakContext';

export default function useTransak() {
  const invalidateQueries = useInvalidateQueries();
  const invalidateInfiniteQueries = useInvalidateInfiniteQuery();
  const transak = useTransakContext();
  const { address } = useWalletState();
  const { data: network } = useGetActiveNetwork();
  const { hideModal } = useModal();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_INITIALISED, () => {
      setIsInitialized(true);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, () => {
      invalidateQueries({
        queryKey: [Queries.GET_BALANCE, address, network?.chainId],
      });
      invalidateQueries({
        queryKey: [Queries.GET_TOKENS, address, network?.chainId],
      });
      invalidateInfiniteQueries([Queries.GET_TRANSACTIONS, address, String(network?.chainId)]);
    });

    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      hideModal(OnRampModal);
    });
  }, [address, network]);

  useEffect(() => {
    transak.init();

    return () => {
      transak.close();
    };
  }, [transak]);

  return isInitialized;
}
