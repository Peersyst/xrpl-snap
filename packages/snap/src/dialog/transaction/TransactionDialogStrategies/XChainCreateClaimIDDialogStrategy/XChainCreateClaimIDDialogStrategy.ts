import type { Component } from '@metamask/snaps-sdk';
import type { XChainCreateClaimID, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainCreateClaimIDDialogStrategy implements TransactionDialogStrategy<XChainCreateClaimID> {
  transactionType: Transaction['TransactionType'] = 'XChainCreateClaimID';

  buildBody({ Account, TransactionType, ...rest }: XChainCreateClaimID): Component[] {
    return [...TransactionTypeComponent(TransactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
