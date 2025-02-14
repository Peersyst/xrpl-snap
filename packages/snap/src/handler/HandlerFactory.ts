import type { Context } from '../core/Context';
import { ExtractPrivateKeyHandler, ExtractPrivateKeyMethod } from './account/ExtractPrivateKeyHandler';
import { GetAccountHandler, GetAccountMethod } from './account/GetAccountHandler';
import { ImportWalletHandler, ImportWalletMethod } from './account/ImportWalletHandler';
import { ListWalletsHandler, ListWalletsMethod } from './account/ListWalletsHandler';
import { SwitchWalletHandler, SwitchWalletMethod } from './account/SwitchWalletHandler';
import { ChangeNetworkHandler, ChangeNetworkMethod } from './network/ChangeNetworkHandler';
import { GetActiveNetworkHandler, GetActiveNetworkMethod } from './network/GetActiveNetworkHandler';
import { GetStoredNetworksHandler, GetStoredNetworksMethod } from './network/GetStoredNetworksHandler';
import { RequestHandler, RequestMethod } from './network/RequestHandler';
import { SignHandler, SignMethod } from './transaction/SignHandler';
import { SignAndSubmitHandler, SignAndSubmitMethod } from './transaction/SignAndSubmitHandler';
import { SignMessageHandler, SignMessageMethod } from './transaction/SignMessageHandler';

export const HandlerFactory = (context: Context) => ({
  [ChangeNetworkMethod]: new ChangeNetworkHandler(context),
  [GetActiveNetworkMethod]: new GetActiveNetworkHandler(context),
  [GetStoredNetworksMethod]: new GetStoredNetworksHandler(context),
  [RequestMethod]: new RequestHandler(context),
  [GetAccountMethod]: new GetAccountHandler(context),
  [SignMethod]: new SignHandler(context),
  [SignAndSubmitMethod]: new SignAndSubmitHandler(context),
  [SignMessageMethod]: new SignMessageHandler(context),
  [ExtractPrivateKeyMethod]: new ExtractPrivateKeyHandler(context),
  [ImportWalletMethod]: new ImportWalletHandler(context),
  [ListWalletsMethod]: new ListWalletsHandler(context),
  [SwitchWalletMethod]: new SwitchWalletHandler(context),
});
