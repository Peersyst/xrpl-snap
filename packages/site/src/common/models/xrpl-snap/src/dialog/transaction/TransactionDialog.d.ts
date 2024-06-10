import type { Component } from '@metamask/snaps-sdk';
import type { Transaction } from 'xrpl';

export declare class TransactionDialog {
  static buildHeader(origin: string): Component[];

  static buildFooter(): Component[];

  static buildBody(transaction: Transaction): Component[];

  static prompt(origin: string, transaction: Transaction): Promise<boolean>;
}
