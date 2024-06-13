import type { Component } from '@metamask/snaps-sdk';
import type { XChainAddAccountCreateAttestation, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../TransactionComponents/TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainAddAccountCreateAttestationDialogStrategy implements TransactionDialogStrategy<XChainAddAccountCreateAttestation> {
  transactionType: Transaction['TransactionType'] = 'XChainAddAccountCreateAttestation';

  buildBody({ Account, ...rest }: XChainAddAccountCreateAttestation): Component[] {
    return [...TransactionTypeComponent(this.transactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
