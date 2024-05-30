import { XrplFaucetSeedsRepositoryErrorCodes } from "../wallet/xrplFaucet/XrplFaucetSeedsRepositoryErrorCodes";
import { CustomTokensRepositoryErrorCodes } from "../bridge/custom-tokens/CustomTokensRepositoryErrorCodes";

// Merge all module error codes here
const RepositoryErrorCodes = {
    ...XrplFaucetSeedsRepositoryErrorCodes,
    ...CustomTokensRepositoryErrorCodes,
};

export type RepositoryErrorCode = keyof typeof RepositoryErrorCodes;

export default RepositoryErrorCodes;
