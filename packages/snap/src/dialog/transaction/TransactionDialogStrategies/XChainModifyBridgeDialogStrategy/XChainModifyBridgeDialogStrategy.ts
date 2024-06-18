import type { Component } from '@metamask/snaps-sdk';
import type { XChainModifyBridge, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainModifyBridgeDialogStrategy implements TransactionDialogStrategy<XChainModifyBridge> {
  transactionType: Transaction['TransactionType'] = 'XChainModifyBridge';

  buildBody({ Account, ...rest }: XChainModifyBridge): Component[] {
    return [...TransactionTypeComponent(this.transactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
