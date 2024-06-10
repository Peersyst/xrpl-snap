import type { Component } from '@metamask/snaps-sdk';
import { divider, heading, panel, text } from '@metamask/snaps-sdk';

import type { Network } from '../../core/StateManager';
import { translate } from '../locale/translate';

export class ChangeNetworkDialog {
  static buildHeader(origin: string): Component[] {
    return [heading(translate('ChangeNetworkHeader')), text(translate('ChangeNetworkSubHeader', { origin }))];
  }

  static buildBody({ nodeUrl, chainId }: Network): Component[] {
    return [
      text(translate('ChangeNetworkNode', { node: nodeUrl })),
      text(
        translate('ChangeNetworkChainId', {
          chainId: chainId.toString(),
        }),
      ),
    ];
  }

  static async prompt(origin: string, network: Network): Promise<boolean> {
    const prompt = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([...this.buildHeader(origin), divider(), ...this.buildBody(network)]),
      },
    });
    return Boolean(prompt);
  }
}
