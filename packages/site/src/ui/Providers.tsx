import { ToastProvider } from '@peersyst/react-components';
import type { PropsWithChildren } from 'react';
import { Fragment } from 'react';

import ErrorHandler from './common/components/feedback/ErrorHandler/ErrorHandler';
import { ConfigProvider } from './config';
import TransakProvider from './fiat-orders/transak/context/TransakProvider';
import QueryClientProvider from './query/QueryClientProvider';

const Providers = ({ children }: PropsWithChildren): JSX.Element => (
  <Fragment>
    <ConfigProvider>
      <ToastProvider>
        <ErrorHandler>
          <QueryClientProvider>
            <TransakProvider>{children}</TransakProvider>
          </QueryClientProvider>
        </ErrorHandler>
      </ToastProvider>
    </ConfigProvider>
  </Fragment>
);

export default Providers;
