import { DomainErrorCode } from "./DomainErrorCodes";
import { AnyObject } from "@swisstype/essential";

export type DomainErrorSeverity = "error" | "warning";

export class DomainError extends Error {
    code: DomainErrorCode;
    severity: DomainErrorSeverity;
    data?: AnyObject;

    constructor(code: DomainErrorCode, severity: DomainErrorSeverity = "error", data?: AnyObject) {
        super(code);

        this.name = "DomainError";
        this.code = code;
        this.severity = severity;
        this.data = data;
    }
}
