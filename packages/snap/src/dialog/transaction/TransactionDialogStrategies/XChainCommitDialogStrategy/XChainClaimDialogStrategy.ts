import type { Component } from '@metamask/snaps-sdk';
import type { XChainCommit, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainCommitDialogStrategy implements TransactionDialogStrategy<XChainCommit> {
  transactionType: Transaction['TransactionType'] = 'XChainCommit';

  buildBody({ Account, TransactionType, ...rest }: XChainCommit): Component[] {
    return [...TransactionTypeComponent(TransactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
