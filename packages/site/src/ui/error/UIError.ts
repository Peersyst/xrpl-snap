import { ParseKeys } from 'i18next';

export type UIErrorMessage = ParseKeys<'error'> | string;
export type UIErrorSeverity = 'error' | 'warning';

export default class UIError extends Error {
  message: UIErrorMessage;
  params?: Record<string, string>;
  severity: UIErrorSeverity;

  constructor(
    message: UIErrorMessage,
    params?: Record<string, string>,
    severity: UIErrorSeverity = 'error',
  ) {
    super(message);

    this.name = 'UIError';
    this.message = message.toCamelCase();
    this.params = params;
    this.severity = severity;
  }
}
