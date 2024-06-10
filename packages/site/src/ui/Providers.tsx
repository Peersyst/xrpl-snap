import { ToastProvider } from '@peersyst/react-components';
import type { PropsWithChildren } from 'react';
import { Fragment } from 'react';

import ErrorHandler from './common/components/feedback/ErrorHandler/ErrorHandler';
import { ConfigProvider } from './config';
import QueryClientProvider from './query/QueryClientProvider';

const Providers = ({ children }: PropsWithChildren): JSX.Element => (
  <Fragment>
    <ConfigProvider>
      <ToastProvider>
        <ErrorHandler>
          <QueryClientProvider>{children}</QueryClientProvider>
        </ErrorHandler>
      </ToastProvider>
    </ConfigProvider>
  </Fragment>
);

export default Providers;
