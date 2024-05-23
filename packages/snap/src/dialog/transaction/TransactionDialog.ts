import type { Component } from '@metamask/snaps-sdk';
import { divider, heading, panel, text } from '@metamask/snaps-sdk';
import type { Transaction } from 'xrpl';

import { translate } from '../locale/translate';
import TransactionFields from './TransactionFields';

export class TransactionDialog {
  static buildHeader(origin: string): Component[] {
    return [
      heading(translate('TransactionHeader')),
      text(translate('TransactionSubHeader', { origin })),
    ];
  }

  static buildFooter(): Component[] {
    return [text(translate('TransactionFooter'))];
  }

  static buildBody(transaction: Transaction): Component[] {
    const body: Component[] = [];
    for (const field of Object.values(TransactionFields)) {
      body.push(...field(transaction));
    }
    return body;
  }

  static async prompt(
    origin: string,
    transaction: Transaction,
  ): Promise<boolean> {
    const signPrompt = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          ...this.buildHeader(origin),
          divider(),
          ...this.buildBody(transaction),
          divider(),
          ...this.buildFooter(),
        ]),
      },
    });
    return Boolean(signPrompt);
  }
}
