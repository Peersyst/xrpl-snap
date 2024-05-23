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

export type NetworkMethod =
  | ChangeNetworkMethod
  | GetActiveNetworkMethod
  | GetStoredNetworkMethod;
export type NetworkParams =
  | ChangeNetworkParams
  | GetActiveNetworkParams
  | GetStoredNetworkParams;

export const NetworkHandlerFactory = (context: Context) => ({
  [ChangeNetwork]: new ChangeNetworkHandler(context),
  [GetActiveNetwork]: new GetActiveNetworkHandler(context),
  [GetStoredNetworks]: new GetStoredNetworksHandler(context),
});
