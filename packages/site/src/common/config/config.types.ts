import { TransakConfig } from '@transak/transak-sdk';
import type { NetworkReserve } from 'common/models';

export type Config = {
  projectName: string;
  publicUrl: string;
  maxNumberDecimals: number;
  nativeToken: string;
  decimals: number;
  peersystUrl: string;
  snapOrigin: string;
  snapAboutUrl: string;
  fiatCurrency: string;
  coinPrice: {
    apiUrl: string;
    xrpId: string;
  };
  tokenMetadata: {
    apiUrl: string;
  };
  metamaskInstallationLink: string;
  refetchIntervals: {
    balance: number;
    transactions: number;
    coinPrice: number;
  };
  mockedAddress: string;
  fiatDecimals: number;
  xrplNetwork: Record<'mainnet' | 'testnet' | 'devnet', NetworkReserve>;
  featureFlags: {
    enablePlayground: boolean;
  };
  reserveInfoLink: string;
  faucet: {
    testnetUrl: string;
    devnetUrl: string;
    xrpAmount: string;
  };
  transak: Omit<TransakConfig, 'environment' | 'containerId'> & { environment: string; containerId: string };
  retry: {
    times: number;
    delay: number;
  };
  nodeUrls: {
    mainnet: string;
    testnet: string;
    devnet: string;
  };
  backendUrl: string;
  surveyUrl: string;
};
