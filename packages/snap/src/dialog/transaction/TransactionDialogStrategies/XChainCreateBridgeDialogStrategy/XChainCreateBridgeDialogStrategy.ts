import type { Component } from '@metamask/snaps-sdk';
import type { XChainCreateBridge, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainCreateBridgeDialogStrategy implements TransactionDialogStrategy<XChainCreateBridge> {
  transactionType: Transaction['TransactionType'] = 'XChainCreateBridge';

  buildBody({ Account, ...rest }: XChainCreateBridge): Component[] {
    return [...TransactionTypeComponent(this.transactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
