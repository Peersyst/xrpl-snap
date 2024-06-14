import type { Component } from '@metamask/snaps-sdk';
import { divider, heading, panel, text } from '@metamask/snaps-sdk';

import type { SnapLocaleKey } from '../locale/translate';
import { translate } from '../locale/translate';

export class ExtractFamilySeedRequestDialog {
  static buildHeader(): Component[] {
    return [heading(translate('ExtractFamilySeedRequestHeader'))];
  }

  static buildBody(): Component[] {
    const body: Component[] = [];
    for (let i = 1; i <= 3; i++) {
      body.push(
        heading(translate(`ExtractFamilySeedRequestBodyStepTitle${i}` as SnapLocaleKey)),
        text(translate(`ExtractFamilySeedRequestBodyStepExplanation${i}` as SnapLocaleKey)),
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
