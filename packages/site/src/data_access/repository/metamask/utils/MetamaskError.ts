import RepositoryError from 'data_access/repository/error/RepositoryError';
import { MetamaskErrorCodes } from '../MetamaskErrorCodes';

export function handleMetamaskError(
  error: any,
  errorCodeParam?: MetamaskErrorCodes,
) {
  if (!(error instanceof RepositoryError)) {
    let errorCode = errorCodeParam;
    if (!errorCode) {
      if (error instanceof Error && error.message.includes('user declined')) {
        errorCode = MetamaskErrorCodes.USER_DECLINED;
      } else {
        errorCode = MetamaskErrorCodes.UNKOWN_ERROR;
      }
    }
    throw new RepositoryError(errorCode);
  } else throw error;
}

export async function withMetamaskError<T>(action: () => T) {
  try {
    return await action();
  } catch (error) {
    handleMetamaskError(error);
  }
}
