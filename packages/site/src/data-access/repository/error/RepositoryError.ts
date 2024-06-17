import { AnyObject } from '@swisstype/essential';

import { RepositoryErrorCode } from './RepositoryErrorCodes';

export default class RepositoryError extends Error {
  code: RepositoryErrorCode;

  data?: AnyObject;

  constructor(code: RepositoryErrorCode, data?: AnyObject) {
    super(code);

    this.name = 'RepositoryError';
    this.code = code;
    this.data = data;
  }
}
