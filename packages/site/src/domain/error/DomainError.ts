import isApiError from "domain/adapter/api/utils/isApiError";
import DomainErrorCodes, { DomainErrorCode } from "./DomainErrorCodes";

export type DomainErrorSeverity = "error" | "warning";

export default class DomainError extends Error {
    code: DomainErrorCode;
    severity: DomainErrorSeverity;

    constructor(code: DomainErrorCode, severity: DomainErrorSeverity = "error") {
        super(code);

        this.name = "DomainError";
        this.code = code;
        this.severity = severity;
    }

    /**
     * Creates a DomainError from an ApiError
     * @param error Any error
     * @param handlers Handlers for especific ApiError codes coming from the backend. If no handler is provided for a code, the error will be UNKNOWN_ERROR
     * @returns The corresponding DomainError
     */
    static fromApiError(error: any, handlers: Record<string, DomainErrorCode | [DomainErrorCode, DomainErrorSeverity]> = {}): DomainError {
        if (isApiError(error)) {
            const errorBodyMessage = handlers[error.body.message];
            const [errorCode, errorSeverity] = Array.isArray(errorBodyMessage) ? errorBodyMessage : [errorBodyMessage, "error" as const];
            return new DomainError(DomainErrorCodes[errorCode] || DomainErrorCodes.UNKNOWN_ERROR, errorSeverity);
        }
        return new DomainError(DomainErrorCodes.UNKNOWN_ERROR);
    }
}
