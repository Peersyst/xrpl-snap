import type { Component } from '@metamask/snaps-sdk';
import type { XChainAddAccountCreateAttestation, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainAddAccountCreateAttestationDialogStrategy implements TransactionDialogStrategy<XChainAddAccountCreateAttestation> {
  transactionType: Transaction['TransactionType'] = 'XChainAddAccountCreateAttestation';

  buildBody({ Account, TransactionType, ...rest }: XChainAddAccountCreateAttestation): Component[] {
    return [...TransactionTypeComponent(TransactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
