import type { Component } from '@metamask/snaps-sdk';
import { DialogType, divider, heading, MethodNotSupportedError, panel, text } from '@metamask/snaps-sdk';
import { type Transaction } from 'xrpl';

import { translate } from '../locale/translate';
import type { ITransactionDialogStrategiesFactory } from './TransactionDialogStrategies/TransactionDialogStrategies.types';
import { TransactionDialogStrategyFactory } from './TransactionDialogStrategies/TransactionDialogStrategyFactory';

export class TransactionDialog {
  static strategiesFactory = TransactionDialogStrategyFactory();

  static buildHeader(origin: string): Component[] {
    return [heading(translate('TransactionHeader')), text(translate('TransactionSubHeader', { origin }))];
  }

  static buildFooter(): Component[] {
    return [text(translate('TransactionFooter'))];
  }

  static async prompt(origin: string, transaction: Transaction): Promise<boolean> {
    const strategy = this.strategiesFactory[transaction.TransactionType as keyof ITransactionDialogStrategiesFactory];

    if (!strategy) {
      throw new MethodNotSupportedError(`TransactionType not supported: ${transaction.TransactionType}`);
    }

    const content = [
      ...(strategy?.buildHeader ? strategy.buildHeader(origin) : this.buildHeader(origin)),
      divider(),
      ...strategy.buildBody(transaction),
      divider(),
      ...(strategy?.buildFooter ? strategy.buildFooter() : this.buildFooter()),
    ];

    const signPrompt = await snap.request({
      method: 'snap_dialog',
      params: {
        type: DialogType.Confirmation,
        content: panel(content),
      },
    });
    return Boolean(signPrompt);
  }
}
