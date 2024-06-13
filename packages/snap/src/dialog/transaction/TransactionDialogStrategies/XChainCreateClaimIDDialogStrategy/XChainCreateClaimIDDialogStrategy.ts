import type { Component } from '@metamask/snaps-sdk';
import type { XChainCreateClaimID, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../TransactionComponents/TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainCreateClaimIDDialogStrategy implements TransactionDialogStrategy<XChainCreateClaimID> {
  transactionType: Transaction['TransactionType'] = 'XChainCreateClaimID';

  buildBody({ Account, ...rest }: XChainCreateClaimID): Component[] {
    return [...TransactionTypeComponent(this.transactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
