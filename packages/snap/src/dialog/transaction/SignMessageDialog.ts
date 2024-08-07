import type { Component } from '@metamask/snaps-sdk';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-sdk';

import { translate } from '../locale/translate';
import { Label } from './TransactionComponents/base/base';

export class SignMessageDialog {
  static buildHeader(origin: string): Component[] {
    return [heading(translate('SignMessageHeader')), text(translate('SignMessageSubHeader', { origin }))];
  }

  static buildFooter(): Component[] {
    return [text(translate('SignMessageFooter'))];
  }

  static buildBody(message: string): Component[] {
    return [Label('SignMessage'), copyable(message)];
  }

  static async prompt(origin: string, message: string): Promise<boolean> {
    const signPrompt = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([...this.buildHeader(origin), divider(), ...this.buildBody(message), divider(), ...this.buildFooter()]),
      },
    });
    return Boolean(signPrompt);
  }
}
