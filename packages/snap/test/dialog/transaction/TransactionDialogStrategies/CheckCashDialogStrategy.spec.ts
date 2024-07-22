import {
  TransactionTypeComponent,
  AccountComponent,
  CheckIDComponent,
  AmountComponent,
  DeliverMinComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { CheckCashDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/CheckCashDialogStrategy/CheckCashDialogStrategy';
import txs from '../../../fixtures/tx';

describe('CheckCashDialogStrategy', () => {
  let strategy: CheckCashDialogStrategy;

  beforeEach(() => {
    strategy = new CheckCashDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('CheckCash'),
      ...AccountComponent(txs.CheckCash.Account),
      ...CheckIDComponent(txs.CheckCash.CheckID),
      ...AmountComponent(txs.CheckCash.Amount),
      ...DeliverMinComponent(txs.CheckCash.DeliverMin),
      ...FeeComponent(txs.CheckCash.Fee),
    ];

    const result = strategy.buildBody(txs.CheckCash);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const checkCash = { ...txs.CheckCash };
    delete checkCash.Amount;
    delete checkCash.DeliverMin;

    const expectedComponents = [
      ...TransactionTypeComponent('CheckCash'),
      ...AccountComponent(txs.CheckCash.Account),
      ...CheckIDComponent(txs.CheckCash.CheckID),
      ...FeeComponent(txs.CheckCash.Fee),
    ];

    const result = strategy.buildBody(checkCash);

    expect(result).toEqual(expectedComponents);
  });
});
