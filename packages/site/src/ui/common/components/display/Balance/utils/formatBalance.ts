import { ACTION_LABEL } from "./actionLabels";
import { CURRENCY_UNIT } from "./currencies";

export type CurrencyPosition = "left" | "right";
export type BalanceAction = "display" | "add" | "round" | "subtract";
export interface FormatBalanceOptions {
    numberFormatOptions?: Omit<Intl.NumberFormatOptions, "useGrouping">;
    currency?: string;
    currencyPosition?: CurrencyPosition;
    action?: BalanceAction;
    hidden?: boolean;
    hiddenLength?: number;
    hiddenPlaceholder?: string;
}

export function formatBalance(
    formattedBalanceNumber: string,
    { action = "display", currency, currencyPosition, hidden = false, hiddenLength = 6, hiddenPlaceholder = "· " }: FormatBalanceOptions,
): string {
    const actionLabel = ACTION_LABEL[action];
    const currencyUnit = currency && (CURRENCY_UNIT[currency] || currency);
    const balanceWithLabel = actionLabel + formattedBalanceNumber.toString();

    if (hidden) {
        const hiddenBalance = hiddenPlaceholder.repeat(hiddenLength);
        return `${hiddenBalance}${currencyUnit || ""}`;
    }

    if (!currencyUnit) return balanceWithLabel;
    if (currencyPosition === "left") {
        return currencyUnit + " " + balanceWithLabel;
    } else {
        return balanceWithLabel + " " + currencyUnit;
    }
}
