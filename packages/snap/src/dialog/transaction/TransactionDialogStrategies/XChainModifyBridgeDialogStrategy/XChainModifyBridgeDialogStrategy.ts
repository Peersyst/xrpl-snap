import type { Component } from '@metamask/snaps-sdk';
import type { XChainModifyBridge, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainModifyBridgeDialogStrategy implements TransactionDialogStrategy<XChainModifyBridge> {
  transactionType: Transaction['TransactionType'] = 'XChainModifyBridge';

  buildBody({ Account, TransactionType, ...rest }: XChainModifyBridge): Component[] {
    return [...TransactionTypeComponent(TransactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
