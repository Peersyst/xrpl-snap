import type { Context } from '../../core/Context';
import { SignAndSubmit, SignAndSubmitHandler } from './SignAndSubmitHandler';
import type {
  SignAndSubmitMethod,
  SignAndSubmitParams,
} from './SignAndSubmitHandler';
import type { SignMethod, SignParams } from './SignHandler';
import { Sign, SignHandler } from './SignHandler';
import type {
  SignMessageMethod,
  SignMessageParams,
} from './SignMessageHandler';
import { SignMessage, SignMessageHandler } from './SignMessageHandler';
import type { SubmitMethod, SubmitParams } from './SubmitHandler';
import { Submit, SubmitHandler } from './SubmitHandler';

export type TransactionMethod =
  | SignAndSubmitMethod
  | SubmitMethod
  | SignMethod
  | SignMessageMethod;
export type TransactionParams =
  | SignAndSubmitParams
  | SubmitParams
  | SignParams
  | SignMessageParams;

export const TransactionHandlerFactory = (context: Context) => ({
  [SignAndSubmit]: new SignAndSubmitHandler(context),
  [Submit]: new SubmitHandler(context),
  [Sign]: new SignHandler(context),
  [SignMessage]: new SignMessageHandler(context),
});
