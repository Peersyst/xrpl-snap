import type { AnyObject } from '@swisstype/essential';

import type { DomainErrorCode } from './DomainErrorCodes';

export type DomainErrorSeverity = 'error' | 'warning';

export class DomainError extends Error {
  code: DomainErrorCode;

  severity: DomainErrorSeverity;

  data?: AnyObject;

  constructor(code: DomainErrorCode, severity: DomainErrorSeverity = 'error', data?: AnyObject) {
    super(code);

    this.name = 'DomainError';
    this.code = code;
    this.severity = severity;
    this.data = data;
  }
}
