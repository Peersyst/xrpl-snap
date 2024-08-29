import RepositoryError from 'data-access/repository/error/RepositoryError';
import RepositoryErrorCodes from 'data-access/repository/error/RepositoryErrorCodes';
import { DomainError } from 'domain/error/DomainError';

export function handleMetaMaskError(error: any) {
  if (!(error instanceof DomainError)) {
    if (
      error instanceof RepositoryError &&
      (error.code === RepositoryErrorCodes.USER_DECLINED ||
        error.code === RepositoryErrorCodes.ACTION_ALREADY_PENDING ||
        error.code === RepositoryErrorCodes.METAMASK_TERMINATED_DURING_EXECUTION)
    ) {
    } else {
      throw error;
    }
  } else {
    throw error;
  }
}

export async function withMetaMaskRepositoryError<T>(action: () => T): Promise<T> {
  async function handleAction() {
    try {
      return await action();
    } catch (error) {
      handleMetaMaskError(error);
    }
  }

  return handleAction() as Promise<T>;
}
