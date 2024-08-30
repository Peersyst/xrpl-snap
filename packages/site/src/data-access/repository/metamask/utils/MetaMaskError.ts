import RepositoryError from 'data-access/repository/error/RepositoryError';

import { MetaMaskErrorCodes } from '../MetaMaskErrorCodes';

export function handleMetaMaskError(error: any, errorCodeParam?: MetaMaskErrorCodes) {
  if (!(error instanceof RepositoryError)) {
    let errorCode = errorCodeParam;
    if (!errorCode) {
      if (error instanceof Object && 'message' in error && error.message.includes('user declined')) {
        errorCode = MetaMaskErrorCodes.USER_DECLINED;
      } else if (error.code === -32002) {
        errorCode = MetaMaskErrorCodes.ACTION_ALREADY_PENDING;
      } else if (error.code === -32603) {
        errorCode = MetaMaskErrorCodes.METAMASK_TERMINATED_DURING_EXECUTION;
      } else {
        errorCode = MetaMaskErrorCodes.UNKOWN_ERROR;
      }
    }
    throw new RepositoryError(errorCode);
  } else {
    throw error;
  }
}

export async function withMetaMaskError<T>(action: () => T): Promise<T> {
  async function handleAction() {
    try {
      return await action();
    } catch (error) {
      handleMetaMaskError(error);
    }
  }

  return handleAction() as Promise<T>;
}
