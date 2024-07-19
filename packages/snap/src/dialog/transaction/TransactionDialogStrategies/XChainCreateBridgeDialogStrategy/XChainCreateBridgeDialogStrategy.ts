import type { Component } from '@metamask/snaps-sdk';
import type { XChainCreateBridge, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainCreateBridgeDialogStrategy implements TransactionDialogStrategy<XChainCreateBridge> {
  transactionType: Transaction['TransactionType'] = 'XChainCreateBridge';

  buildBody({ Account, TransactionType, ...rest }: XChainCreateBridge): Component[] {
    return [...TransactionTypeComponent(TransactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
