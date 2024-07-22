import {
  TransactionTypeComponent,
  AccountComponent,
  AmountComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { ClawbackDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/ClawbackDialogStrategy/ClawbackDialogStrategy';
import txs from '../../../fixtures/tx';

describe('ClawbackDialogStrategy', () => {
  let strategy: ClawbackDialogStrategy;

  beforeEach(() => {
    strategy = new ClawbackDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('Clawback'),
      ...AccountComponent(txs.Clawback.Account),
      ...AmountComponent(txs.Clawback.Amount),
      ...FeeComponent(txs.Clawback.Fee),
    ];

    const result = strategy.buildBody(txs.Clawback);

    expect(result).toEqual(expectedComponents);
  });
});
