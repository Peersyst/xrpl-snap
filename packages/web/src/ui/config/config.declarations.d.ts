import "@peersyst/react-components";
import { TFunction } from "react-i18next";
import { Config as CommonConfig } from "../../common/config/config.types";

declare module "@peersyst/react-components" {
    export interface ConfigTypes {
        TranslateFn: TFunction<"error">;
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
    }

    export interface ExtraValidators {
        xrplAddress: Validator<boolean>;
    }
}
