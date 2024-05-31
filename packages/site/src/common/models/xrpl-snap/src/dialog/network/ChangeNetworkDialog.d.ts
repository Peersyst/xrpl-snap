import type { Component } from '@metamask/snaps-sdk';
import type { Network } from '../../core/StateManager';
export declare class ChangeNetworkDialog {
    static buildHeader(origin: string): Component[];
    static buildBody({ nodeUrl, chainId }: Network): Component[];
    static prompt(origin: string, network: Network): Promise<boolean>;
}
