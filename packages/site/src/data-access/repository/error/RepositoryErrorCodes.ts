import { GiveAwayRepositoryErrorCodes } from '../give-away/GiveAwayRepositoryErrorCodes';
import { MetaMaskErrorCodes } from '../metamask/MetaMaskErrorCodes';
import { FundErrorCodes } from '../xrpl/FundErrorCodes';
import { XrplErrorCodes } from '../xrpl/XrplErrorCodes';

// Merge all module error codes here
const RepositoryErrorCodes = {
  ...MetaMaskErrorCodes,
  ...FundErrorCodes,
  ...XrplErrorCodes,
  ...GiveAwayRepositoryErrorCodes,
};

export type RepositoryErrorCode = keyof typeof RepositoryErrorCodes;

export default RepositoryErrorCodes;
