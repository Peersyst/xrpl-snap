import '@peersyst/react-components';
import type { TFunction } from 'react-i18next';

import type { Config as CommonConfig } from '../../common/config/config.types';

declare module '@peersyst/react-components' {
  export type ConfigTypes = {
    TranslateFn: TFunction<'error'>;
  };

  export type Config = {} & CommonConfig;

  export type CreateConfig = {};

  export type BlockchainLinksTypesOverrides = {
    address: false;
    tx: false;
    token: false;
    nft: false;
    mainnetAddress: true;
    mainnetTx: true;
    testnetAddress: true;
    testnetTx: true;
  };
  export type BlockchainLinks = {
    address: undefined;
    tx: undefined;
    token: undefined;
    nft: undefined;
    mainnetAddress: string;
    mainnetTx: string;
    testnetAddress: string;
    testnetTx: string;
  };

  export type ExtraValidators = {
    xrplAddress: Validator<boolean>;
  };
}
