import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';

export declare const GetActiveNetworkMethod = 'xrpl_getActiveNetwork';
export declare class GetActiveNetworkHandler implements IHandler<typeof GetActiveNetworkMethod> {
  protected readonly context: Context;

  constructor(context: Context);

  handle(): Promise<import('../../core/StateManager').Network>;
}
