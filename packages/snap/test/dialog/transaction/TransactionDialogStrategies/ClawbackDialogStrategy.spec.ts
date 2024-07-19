import txs from '../../../fixtures/tx';
import { ClawbackDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/ClawbackDialogStrategy/ClawbackDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  AmountComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

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
