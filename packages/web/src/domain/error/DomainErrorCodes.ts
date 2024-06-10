import { TransactionErrorCodes } from "domain/transaction/error/TransactionErrorCodes";
import { WalletErrorCodes } from "../wallet/WalletErrorCodes";

export enum GenericErrorCodes {
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

// Merge all module error codes here
export const DomainErrorCodes = {
    ...GenericErrorCodes,
    ...WalletErrorCodes,
    ...TransactionErrorCodes,
};

export type DomainErrorCode = keyof typeof DomainErrorCodes;

export default DomainErrorCodes;
