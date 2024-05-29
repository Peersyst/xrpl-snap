import { ConfigProvider as GenesysConfigProvider } from '@peersyst/react-components';
import { ReactNode } from 'react';
import config from './config';
import { GlobalStyles } from './theme/GlobalStyles';
import { useTranslate } from '../locale';

export interface ConfigProviderProps {
  children?: ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps): JSX.Element => {
  const translate = useTranslate('error');

  return (
    <GenesysConfigProvider config={{ ...config, translate }}>
      <GlobalStyles />
      {children}
    </GenesysConfigProvider>
  );
};

export default ConfigProvider;
