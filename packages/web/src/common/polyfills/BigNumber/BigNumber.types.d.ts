import type BigNumberJS from "bignumber.js";

declare global {
    // Copied from BigNumberJS declarations to have the global namespace
    namespace BigNumber {
        interface Config {
            DECIMAL_PLACES?: number;
            ROUNDING_MODE?: RoundingMode;
            EXPONENTIAL_AT?: number | [number, number];
            RANGE?: number | [number, number];
            CRYPTO?: boolean;
            MODULO_MODE?: ModuloMode;
            POW_PRECISION?: number;
            FORMAT?: Format;
            ALPHABET?: string;
        }

        interface Format {
            prefix?: string;

            decimalSeparator?: string;

            groupSeparator?: string;
            groupSize?: number;
            secondaryGroupSize?: number;
            fractionGroupSeparator?: string;
            fractionGroupSize?: number;
            suffix?: string;
        }

        interface Instance {
            readonly c: number[] | null;
            readonly e: number | null;
            readonly s: number | null;
            [key: string]: any;
        }

        type Constructor = typeof BigNumber;
        type ModuloMode = 0 | 1 | 3 | 6 | 9;
        type RoundingMode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
        type Value = string | number | Instance;
    }

    // eslint-disable-next-line no-var
    var BigNumber: typeof BigNumberJS;
}
