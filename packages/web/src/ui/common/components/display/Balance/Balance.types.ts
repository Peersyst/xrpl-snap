import { TypographyProps } from "@peersyst/react-components";
import BigNumber from "bignumber.js";
import { BalanceAction, CurrencyPosition } from "./utils";

export type BalanceRootProps = {
    action?: BalanceAction;
};

export type BalanceProps = {
    /**
     * Balance with decimals
     */
    balance: BigNumber.Value;
    currency?: string;
    currencyPosition?: CurrencyPosition;
    options?: Intl.NumberFormatOptions;
    loading?: boolean;
    /**
     * Hide balance
     * @default false
     */
    hidden?: boolean;
    /**
     * Number of characters to show when balance is hidden
     * @default 6
     */
    hiddenLength?: number;
    /**
     * Placeholder to show when balance is hidden
     * @default "· "
     */
    hiddenPlaceholder?: string;
} & Omit<TypographyProps, "children" | "numberOfLines"> &
    BalanceRootProps;
