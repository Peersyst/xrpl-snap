import type { Component } from '@metamask/snaps-sdk';
import type { XChainCommit, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainCommitDialogStrategy implements TransactionDialogStrategy<XChainCommit> {
  transactionType: Transaction['TransactionType'] = 'XChainCommit';

  buildBody({ Account, ...rest }: XChainCommit): Component[] {
    return [...TransactionTypeComponent(this.transactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
