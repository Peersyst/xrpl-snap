import { MetamaskErrorCodes } from '../metamask/MetamaskErrorCodes';

// Merge all module error codes here
const RepositoryErrorCodes = {
  ...MetamaskErrorCodes,
};

export type RepositoryErrorCode = keyof typeof RepositoryErrorCodes;

export default RepositoryErrorCodes;
