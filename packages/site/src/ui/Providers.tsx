import { Fragment, PropsWithChildren } from 'react';
import { ToastProvider } from '@peersyst/react-components';
import QueryClientProvider from './query/QueryClientProvider';
import ErrorHandler from './common/components/feedback/ErrorHandler/ErrorHandler';
import { ConfigProvider } from './config';
import { MetaMaskProvider } from './snap/MetamaskContext';

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <Fragment>
    <ConfigProvider>
      <ToastProvider>
        <ErrorHandler>
          <QueryClientProvider>
            <MetaMaskProvider>{children}</MetaMaskProvider>
          </QueryClientProvider>
        </ErrorHandler>
      </ToastProvider>
    </ConfigProvider>
  </Fragment>
);

export default Providers;
