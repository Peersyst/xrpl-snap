import type { DomainErrorCode } from './DomainErrorCodes';

export type DomainErrorSeverity = 'error' | 'warning';

export default class DomainError extends Error {
  code: DomainErrorCode;

  severity: DomainErrorSeverity;

  constructor(code: DomainErrorCode, severity: DomainErrorSeverity = 'error') {
    super(code);

    this.name = 'DomainError';
    this.code = code;
    this.severity = severity;
  }
}
