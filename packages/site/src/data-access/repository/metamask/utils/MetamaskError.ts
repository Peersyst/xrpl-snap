import RepositoryError from 'data-access/repository/error/RepositoryError';

import { MetamaskErrorCodes } from '../MetamaskErrorCodes';

export function handleMetamaskError(error: any, errorCodeParam?: MetamaskErrorCodes) {
  if (!(error instanceof RepositoryError)) {
    let errorCode = errorCodeParam;
    if (!errorCode) {
      if (error instanceof Object && 'message' in error && error.message.includes('user declined')) {
        errorCode = MetamaskErrorCodes.USER_DECLINED;
      } else if (error.code === -32002) {
        errorCode = MetamaskErrorCodes.ACTION_ALREADY_PENDING;
      } else if (error.code === -32603) {
        errorCode = MetamaskErrorCodes.METAMASK_TERMINATED_DURING_EXECUTION;
      } else {
        errorCode = MetamaskErrorCodes.UNKOWN_ERROR;
      }
    }
    throw new RepositoryError(errorCode);
  } else {
    throw error;
  }
}

export async function withMetamaskError<T>(action: () => T): Promise<T> {
  async function handleAction() {
    try {
      return await action();
    } catch (error) {
      handleMetamaskError(error);
    }
  }

  return handleAction() as Promise<T>;
}
