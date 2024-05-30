import { type FunctionComponent, type ReactNode } from 'react';
import CardPage from 'ui/common/pages/CardPage/CardPage';
import { useStore } from 'zustand';

import snapState from './domain/snap/state/snapState';
import Modal from './ui/common/components/feedback/Modal/Modal';
import { useLoad } from './ui/common/hooks/useLoad';
import ConnectSnapModal from './ui/snap/containers/ConnectSnapModal/ConnectSnapModal';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const loading = useLoad();
  const useSnapState = useStore(snapState);
  return (
    <CardPage>
      {children}
      <Modal
        title={'todo: install metamask'}
        open={!loading && !useSnapState.isMetamaskInstalled}
      />
      <ConnectSnapModal
        open={
          !loading &&
          useSnapState.isMetamaskInstalled &&
          !useSnapState.isSnapInstalled
        }
      />
    </CardPage>
  );
};
