import type { Component } from '@metamask/snaps-sdk';
import { DialogType, divider, heading, MethodNotSupportedError, panel, text } from '@metamask/snaps-sdk';
import { type Transaction } from 'xrpl';

import { translate } from '../locale/translate';
import { ReviewTransactionComponent } from './TransactionComponents';
import type { ITransactionDialogStrategiesFactory } from './TransactionDialogStrategies/TransactionDialogStrategies.types';
import { TransactionDialogStrategyFactory } from './TransactionDialogStrategies/TransactionDialogStrategyFactory';

export class TransactionDialog {
  static strategiesFactory = TransactionDialogStrategyFactory();

  static buildHeader(origin: string): Component[] {
    return [heading(translate('TransactionHeader')), text(translate('TransactionSubHeader', { origin }))];
  }

  static buildFooter(transaction: Transaction): Component[] {
    return [text(translate('TransactionFooter')), ...ReviewTransactionComponent(transaction)];
  }

  /**
   * Show the transaction for confirmation.
   *
   * @param origin - The requesting origin.
   * @param transaction - The transaction to review.
   * @param opts - Options.
   * @param opts.signingFor - Set when multisigning: the account being signed
   * for, shown above the transaction so the user knows they are co-signing.
   * @returns Whether the user confirmed.
   */
  static async prompt(origin: string, transaction: Transaction, opts: { signingFor?: string } = {}): Promise<boolean> {
    const strategy = this.strategiesFactory[transaction.TransactionType as keyof ITransactionDialogStrategiesFactory];

    if (!strategy) {
      throw new MethodNotSupportedError(`TransactionType not supported: ${transaction.TransactionType}`);
    }

    const content = [
      ...(strategy?.buildHeader ? strategy.buildHeader(origin) : this.buildHeader(origin)),
      ...(opts.signingFor ? [text(translate('SignForNotice', { account: opts.signingFor }))] : []),
      divider(),
      ...strategy.buildBody(transaction),
      divider(),
      ...(strategy?.buildFooter ? strategy.buildFooter(transaction) : this.buildFooter(transaction)),
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
