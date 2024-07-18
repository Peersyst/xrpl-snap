import type { Component } from '@metamask/snaps-sdk';
import { divider, heading, panel, text } from '@metamask/snaps-sdk';

import { translate } from '../locale/translate';
import type { LocaleKey } from '../locale/translate';

export class ExtractPrivateKeyRequestDialog {
  static buildHeader(): Component[] {
    return [heading(translate('ExtractPrivateKeyRequestHeader'))];
  }

  static buildBody(): Component[] {
    const body: Component[] = [];
    for (let i = 1; i <= 3; i++) {
      body.push(
        heading(translate(`ExtractPrivateKeyRequestBodyStepTitle${i}` as LocaleKey)),
        text(translate(`ExtractPrivateKeyRequestBodyStepExplanation${i}` as LocaleKey)),
      );
    }
    return body;
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
