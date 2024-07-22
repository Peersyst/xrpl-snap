import type { Component } from '@metamask/snaps-sdk';
import type { XChainClaim, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainClaimDialogStrategy implements TransactionDialogStrategy<XChainClaim> {
  transactionType: Transaction['TransactionType'] = 'XChainClaim';

  buildBody({ Account, TransactionType, ...rest }: XChainClaim): Component[] {
    return [...TransactionTypeComponent(TransactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
