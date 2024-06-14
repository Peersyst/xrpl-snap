import type { Component } from '@metamask/snaps-sdk';
import type { XChainAddClaimAttestation, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainAddClaimAttestationDialogStrategy implements TransactionDialogStrategy<XChainAddClaimAttestation> {
  transactionType: Transaction['TransactionType'] = 'XChainAddClaimAttestation';

  buildBody({ Account, ...rest }: XChainAddClaimAttestation): Component[] {
    return [...TransactionTypeComponent(this.transactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
