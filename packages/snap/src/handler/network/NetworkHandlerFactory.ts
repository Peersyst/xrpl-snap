import type { Context } from '../../core/Context';
import type {
  ChangeNetworkMethod,
  ChangeNetworkParams,
} from './ChangeNetworkHandler';
import { ChangeNetwork, ChangeNetworkHandler } from './ChangeNetworkHandler';
import type {
  GetActiveNetworkMethod,
  GetActiveNetworkParams,
} from './GetActiveNetworkHandler';
import {
  GetActiveNetwork,
  GetActiveNetworkHandler,
} from './GetActiveNetworkHandler';
import type {
  GetStoredNetworkMethod,
  GetStoredNetworkParams,
} from './GetStoredNetworksHandler';
import {
  GetStoredNetworks,
  GetStoredNetworksHandler,
} from './GetStoredNetworksHandler';
import type { RequestMethod, RequestParams } from './RequestHandler';
import { RequestName, RequestHandler } from './RequestHandler';

export type NetworkMethod =
  | ChangeNetworkMethod
  | GetActiveNetworkMethod
  | GetStoredNetworkMethod
  | RequestMethod;

export type NetworkParams =
  | ChangeNetworkParams
  | GetActiveNetworkParams
  | GetStoredNetworkParams
  | RequestParams;

export const NetworkHandlerFactory = (context: Context) => ({
  [ChangeNetwork]: new ChangeNetworkHandler(context),
  [GetActiveNetwork]: new GetActiveNetworkHandler(context),
  [GetStoredNetworks]: new GetStoredNetworksHandler(context),
  [RequestName]: new RequestHandler(context),
});
