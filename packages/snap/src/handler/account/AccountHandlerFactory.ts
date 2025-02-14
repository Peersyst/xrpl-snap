import type { Context } from '../../core/Context';
import { ExtractPrivateKeyMethod, ExtractPrivateKeyHandler } from './ExtractPrivateKeyHandler';
import { GetAccountMethod, GetAccountHandler } from './GetAccountHandler';
import { ImportWalletMethod, ImportWalletHandler } from './ImportWalletHandler';
import { ListWalletsMethod, ListWalletsHandler } from './ListWalletsHandler';
import { SwitchWalletMethod, SwitchWalletHandler } from './SwitchWalletHandler';

export type AccountMethod =
  | typeof GetAccountMethod
  | typeof ExtractPrivateKeyMethod
  | typeof ImportWalletMethod
  | typeof ListWalletsMethod
  | typeof SwitchWalletMethod;

export const AccountHandlerFactory = (context: Context) => ({
  [GetAccountMethod]: new GetAccountHandler(context),
  [ExtractPrivateKeyMethod]: new ExtractPrivateKeyHandler(context),
  [ImportWalletMethod]: new ImportWalletHandler(context),
  [ListWalletsMethod]: new ListWalletsHandler(context),
  [SwitchWalletMethod]: new SwitchWalletHandler(context),
});
