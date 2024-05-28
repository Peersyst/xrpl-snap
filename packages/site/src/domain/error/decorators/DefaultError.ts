import DomainError from '../DomainError';
import DomainErrorCodes, { DomainErrorCode } from '../DomainErrorCodes';
import createErrorHandlerDecorator from '../../../common/decorators/createErrorHandlerDecorator';

function handleDefaultError(
  error: any,
  errorCode: DomainErrorCode = DomainErrorCodes.UNKNOWN_ERROR,
) {
  if (!(error instanceof DomainError)) throw new DomainError(errorCode);
  else throw error;
}

const DefaultError = createErrorHandlerDecorator(handleDefaultError);

export default DefaultError;
