import type { RepositoryErrorCode } from './RepositoryErrorCodes';

export default class RepositoryError extends Error {
  code: RepositoryErrorCode;

  constructor(code: RepositoryErrorCode) {
    super(code);

    this.name = 'RepositoryError';
    this.code = code;
  }
}
