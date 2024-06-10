import { ConfigProvider as GenesysConfigProvider } from '@peersyst/react-components';
import type { ReactNode } from 'react';

import commonConfig from '../../common/config/config';
import { useTranslate } from '../locale';
import config from './config';
import { GlobalStyles } from './theme/GlobalStyles';

export type ConfigProviderProps = {
  children?: ReactNode;
};

const ConfigProvider = ({ children }: ConfigProviderProps): JSX.Element => {
  const translate = useTranslate('error');

  return (
    <GenesysConfigProvider config={{ ...config, ...commonConfig, translate }}>
      <GlobalStyles />
      {children}
    </GenesysConfigProvider>
  );
};

export default ConfigProvider;
