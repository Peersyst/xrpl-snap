import type { Component } from '@metamask/snaps-sdk';
import type { XChainClaim, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainClaimDialogStrategy implements TransactionDialogStrategy<XChainClaim> {
  transactionType: Transaction['TransactionType'] = 'XChainClaim';

  buildBody({ Account, ...rest }: XChainClaim): Component[] {
    return [...TransactionTypeComponent(this.transactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
