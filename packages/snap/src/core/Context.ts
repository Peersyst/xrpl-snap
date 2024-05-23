import { Provider } from './Provider';
import { StateManager } from './StateManager';
import { Wallet } from './Wallet';

export class Context {
  constructor(
    public readonly stateManager: StateManager,
    public readonly provider: Provider,
    public readonly wallet: Wallet,
  ) {}

  static async init(): Promise<Context> {
    const stateManager = new StateManager();
    const state = await stateManager.get();
    const provider = new Provider(state.activeNetwork.nodeUrl);
    const wallet = await Wallet.derive(state.activeNetwork.chainId);
    return new Context(stateManager, provider, wallet);
  }
}
