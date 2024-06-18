import type { Component } from '@metamask/snaps-sdk';
import { copyable, divider, heading, panel } from '@metamask/snaps-sdk';

import { translate } from '../locale/translate';

export class ExtractPrivateKeyDialog {
  static buildHeader(): Component[] {
    return [heading(translate('ExtractPrivateKeyHeader'))];
  }

  static buildBody(privateKey: string): Component[] {
    return [copyable(privateKey)];
  }

  static async prompt(privateKey: string): Promise<void> {
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: panel([...this.buildHeader(), divider(), ...this.buildBody(privateKey)]),
      },
    });
  }
}
