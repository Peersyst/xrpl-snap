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
  metamaskInstallationLink: string;
  refetchIntervals: {
    balance: number;
    transactions: number;
    coinPrice: number;
  };
  mockedAddress: string;
  fiatDecimals: number;
  xrplNetwork: NetworkReserve;
};
