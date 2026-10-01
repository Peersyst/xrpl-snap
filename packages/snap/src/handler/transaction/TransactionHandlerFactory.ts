import type { Context } from '../../core/Context';
import { SignAndSubmitHandler, SignAndSubmitMethod } from './SignAndSubmitHandler';
import { SignForHandler, SignForMethod } from './SignForHandler';
import { SignHandler, SignMethod } from './SignHandler';
import { SignMessageHandler, SignMessageMethod } from './SignMessageHandler';
import { SubmitHandler, SubmitMethod } from './SubmitHandler';

export type TransactionMethod =
  | typeof SignAndSubmitMethod
  | typeof SubmitMethod
  | typeof SignMethod
  | typeof SignForMethod
  | typeof SignMessageMethod;

export const TransactionHandlerFactory = (context: Context) => ({
  [SignAndSubmitMethod]: new SignAndSubmitHandler(context),
  [SubmitMethod]: new SubmitHandler(context),
  [SignMethod]: new SignHandler(context),
  [SignForMethod]: new SignForHandler(context),
  [SignMessageMethod]: new SignMessageHandler(context),
});
