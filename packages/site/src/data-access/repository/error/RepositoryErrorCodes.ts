import { MetaMaskErrorCodes } from '../metamask/MetaMaskErrorCodes';

// Merge all module error codes here
const RepositoryErrorCodes = {
  ...MetaMaskErrorCodes,
};

export type RepositoryErrorCode = keyof typeof RepositoryErrorCodes;

export default RepositoryErrorCodes;
