import type { Component } from '@metamask/snaps-sdk';
import type { SubmittableTransaction, Transaction } from 'xrpl';

export type TransactionDialogStrategy<T extends Transaction = Transaction> = {
  buildHeader?(origin: string): Component[];
  buildBody(transaction: T): Component[];
  buildFooter?(): Component[];
};

export type ITransactionDialogStrategiesFactory = Record<SubmittableTransaction['TransactionType'], TransactionDialogStrategy>;
