import type { Context } from '../../core/Context';
import type { Network } from '../../core/StateManager';
import type { IHandler } from '../IHandler';

export declare const GetStoredNetworksMethod = 'xrpl_getStoredNetworks';
export declare class GetStoredNetworksHandler implements IHandler<typeof GetStoredNetworksMethod> {
  protected readonly context: Context;

  constructor(context: Context);

  handle(): Promise<Network[]>;
}
