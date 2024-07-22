import type { Component } from '@metamask/snaps-sdk';
import type { XChainAccountCreateCommit, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainAccountCreateCommitDialogStrategy implements TransactionDialogStrategy<XChainAccountCreateCommit> {
  transactionType: Transaction['TransactionType'] = 'XChainAccountCreateCommit';

  buildBody({ Account, TransactionType, ...rest }: XChainAccountCreateCommit): Component[] {
    return [...TransactionTypeComponent(TransactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
