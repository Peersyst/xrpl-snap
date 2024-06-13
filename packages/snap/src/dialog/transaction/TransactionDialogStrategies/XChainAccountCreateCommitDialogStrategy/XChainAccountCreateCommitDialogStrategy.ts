import type { Component } from '@metamask/snaps-sdk';
import type { XChainAccountCreateCommit, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../TransactionComponents/TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainAccountCreateCommitDialogStrategy implements TransactionDialogStrategy<XChainAccountCreateCommit> {
  transactionType: Transaction['TransactionType'] = 'XChainAccountCreateCommit';

  buildBody({ Account, ...rest }: XChainAccountCreateCommit): Component[] {
    return [...TransactionTypeComponent(this.transactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
