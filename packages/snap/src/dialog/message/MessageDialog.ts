import type { Component } from '@metamask/snaps-sdk';
import { divider, heading, panel, text } from '@metamask/snaps-sdk';

import { translate } from '../locale/translate';

export class MessageDialog {
  static buildHeader(origin: string): Component[] {
    return [
      heading(translate('MessageHeader')),
      text(translate('MessageSubHeader', { origin })),
    ];
  }

  static buildFooter(): Component[] {
    return [text(translate('MessageFooter'))];
  }

  static buildBody(message: string): Component[] {
    return [text(translate('Message', { message }))];
  }

  static async prompt(origin: string, message: string): Promise<boolean> {
    const signPrompt = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          ...this.buildHeader(origin),
          divider(),
          ...this.buildBody(message),
          divider(),
          ...this.buildFooter(),
        ]),
      },
    });
    return Boolean(signPrompt);
  }
}
