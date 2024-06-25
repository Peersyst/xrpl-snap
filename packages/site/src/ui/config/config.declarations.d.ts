import '@peersyst/react-components';
import type { TFunction } from 'react-i18next';

import type { Config as CommonConfig } from '../../common/config/config.types';

declare module '@peersyst/react-components' {
  export interface ConfigTypes {
    TranslateFn: TFunction<'error'>;
  }

  export interface Config extends CommonConfig {}

  export interface CreateConfig {}

  export interface BlockchainLinksTypesOverrides {
    address: false;
    tx: false;
    token: false;
    nft: false;
    mainnetAddress: true;
    mainnetTx: true;
    testnetAddress: true;
    testnetTx: true;
    devnetAddress: true;
    devnetTx: true;
  }
  export interface BlockchainLinks {
    address: undefined;
    tx: undefined;
    token: undefined;
    nft: undefined;
    mainnetAddress: string;
    mainnetTx: string;
    testnetAddress: string;
    testnetTx: string;
    devnetAddress: string;
    devnetTx: string;
  }

  export interface ExtraValidators {
    xrplAddress: Validator<boolean>;
  }
}
