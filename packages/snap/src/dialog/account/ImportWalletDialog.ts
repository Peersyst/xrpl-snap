import type { Component } from '@metamask/snaps-sdk';
import { divider, heading, panel, text } from '@metamask/snaps-sdk';

import { translate } from '../locale/translate';

export class ImportWalletDialog {
  static buildHeader(origin: string): Component[] {
    return [heading(translate('ImportWalletHeader')), text(translate('ImportWalletSubHeader', { origin }))];
  }

  static buildBody(address: string): Component[] {
    return [
      text(translate('ImportWalletAddress', { address })),
      text(translate('ImportWalletWarning')),
    ];
  }

  static async prompt(origin: string, address: string): Promise<boolean> {
    const content = panel([
      heading(translate('ImportWalletHeader')),
      divider(),
      text(translate('ImportWalletWarning')),
      text(translate('ImportWalletAddress', { address })),
      text(translate('ImportWalletSubHeader', { origin }))
    ]);

    const response = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content
      }
    });

    return response === true;
  }
} 