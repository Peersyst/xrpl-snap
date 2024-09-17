import { MetaMaskErrorCodes } from '../metamask/MetaMaskErrorCodes';
import { FundErrorCodes } from '../xrpl/FundErrorCodes';

// Merge all module error codes here
const RepositoryErrorCodes = {
  ...MetaMaskErrorCodes,
  ...FundErrorCodes,
};

export type RepositoryErrorCode = keyof typeof RepositoryErrorCodes;

export default RepositoryErrorCodes;
