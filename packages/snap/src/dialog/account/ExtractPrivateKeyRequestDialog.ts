import type { Component } from '@metamask/snaps-sdk';
import { divider, heading, panel, text } from '@metamask/snaps-sdk';

import { translate } from '../locale/translate';

export class ExtractPrivateKeyRequestDialog {
  static buildHeader(): Component[] {
    return [heading(translate('ExtractPrivateKeyRequestHeader'))];
  }

  static buildBody(): Component[] {
    return [text(translate('ExtractPrivateKeyRequestBody'))];
  }

  static async prompt(): Promise<boolean> {
    const prompt = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([...this.buildHeader(), divider(), ...this.buildBody()]),
      },
    });
    return Boolean(prompt);
  }
}
