import type { AnyObject } from '@swisstype/essential';
import type { ParseKeys } from 'i18next';

export type UIErrorMessage = ParseKeys<'error'> | string;
export type UIErrorSeverity = 'error' | 'warning';

export default class UIError extends Error {
  message: UIErrorMessage;

  severity: UIErrorSeverity;

  data?: AnyObject;

  constructor(message: UIErrorMessage, severity: UIErrorSeverity = 'error', data?: AnyObject) {
    super(message);

    this.name = 'UIError';
    this.message = message.toCamelCase();
    this.severity = severity;
    this.data = data;
  }
}
