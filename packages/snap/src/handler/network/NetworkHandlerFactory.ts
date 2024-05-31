import type { Context } from '../../core/Context';
import {
  ChangeNetworkHandler,
  ChangeNetworkMethod,
} from './ChangeNetworkHandler';
import {
  GetActiveNetworkHandler,
  GetActiveNetworkMethod,
} from './GetActiveNetworkHandler';
import {
  GetStoredNetworksHandler,
  GetStoredNetworksMethod,
} from './GetStoredNetworksHandler';
import { RequestHandler, RequestMethod } from './RequestHandler';

export type NetworkMethod =
  | typeof ChangeNetworkMethod
  | typeof GetActiveNetworkMethod
  | typeof GetStoredNetworksMethod
  | typeof RequestMethod;

export const NetworkHandlerFactory = (context: Context) => ({
  [ChangeNetworkMethod]: new ChangeNetworkHandler(context),
  [GetActiveNetworkMethod]: new GetActiveNetworkHandler(context),
  [GetStoredNetworksMethod]: new GetStoredNetworksHandler(context),
  [RequestMethod]: new RequestHandler(context),
});
