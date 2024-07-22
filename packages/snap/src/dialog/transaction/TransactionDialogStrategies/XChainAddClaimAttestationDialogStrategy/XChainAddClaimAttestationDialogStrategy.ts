import type { Component } from '@metamask/snaps-sdk';
import type { XChainAddClaimAttestation, Transaction } from 'xrpl';

import { AccountComponent, FullTransactionComponent, TransactionTypeComponent } from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class XChainAddClaimAttestationDialogStrategy implements TransactionDialogStrategy<XChainAddClaimAttestation> {
  transactionType: Transaction['TransactionType'] = 'XChainAddClaimAttestation';

  buildBody({ Account, TransactionType, ...rest }: XChainAddClaimAttestation): Component[] {
    return [...TransactionTypeComponent(TransactionType), ...AccountComponent(Account), ...FullTransactionComponent(rest)];
  }
}
