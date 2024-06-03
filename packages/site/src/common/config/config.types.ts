export type Config = {
  maxNumberDecimals: number;
  projectName: string;
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
};
