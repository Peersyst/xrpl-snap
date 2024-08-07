import {
  TransactionTypeComponent,
  AccountComponent,
  CheckIDComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { CheckCancelDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/CheckCancelDialogStrategy/CheckCancelDialogStrategy';
import txs from '../../../fixtures/tx';

describe('CheckCancelDialogStrategy', () => {
  let strategy: CheckCancelDialogStrategy;

  beforeEach(() => {
    strategy = new CheckCancelDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('CheckCancel'),
      ...AccountComponent(txs.CheckCancel.Account),
      ...CheckIDComponent(txs.CheckCancel.CheckID),
      ...FeeComponent(txs.CheckCancel.Fee),
    ];

    const result = strategy.buildBody(txs.CheckCancel);

    expect(result).toEqual(expectedComponents);
  });
});
