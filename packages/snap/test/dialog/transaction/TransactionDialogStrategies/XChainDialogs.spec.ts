import {
  TransactionTypeComponent,
  AccountComponent,
  FullTransactionComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { XChainAccountCreateCommitDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/XChainAccountCreateCommitDialogStrategy/XChainAccountCreateCommitDialogStrategy';
import txs from '../../../fixtures/tx';

describe('XChainDialogs', () => {
  test('Builds body correctly', () => {
    const strategy = new XChainAccountCreateCommitDialogStrategy();
    const { Account, TransactionType, ...rest } = txs.XChainAccountCreateCommit;

    const expectedComponents = [
      ...TransactionTypeComponent(TransactionType),
      ...AccountComponent(Account),
      ...FullTransactionComponent(rest),
    ];

    const result = strategy.buildBody({ ...txs.XChainAccountCreateCommit });

    expect(result).toEqual(expectedComponents);
  });
});
