import Amount from "../../utils/Amount";

export type Token = {
    decimals: number;
    issuer: string;
    currency: string;
};

export type TokenWithBalance = Token & {
    balance: Amount;
};
