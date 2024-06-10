import type { Provider } from './Provider';
import type { StateManager } from './StateManager';
import type { Wallet } from './Wallet';

export declare class Context {
  readonly stateManager: StateManager;

  readonly provider: Provider;

  readonly wallet: Wallet;

  constructor(stateManager: StateManager, provider: Provider, wallet: Wallet);

  static init(): Promise<Context>;
}
