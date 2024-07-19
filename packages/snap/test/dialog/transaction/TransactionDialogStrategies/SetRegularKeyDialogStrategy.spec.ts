import txs from '../../../fixtures/tx';
import { SetRegularKeyDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/SetRegularKeyDialogStrategy/SetRegularKeyDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  RegularKeyComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('SetRegularKeyDialogStrategy', () => {
  let strategy: SetRegularKeyDialogStrategy;

  beforeEach(() => {
    strategy = new SetRegularKeyDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('SetRegularKey'),
      ...AccountComponent(txs.SetRegularKey.Account),
      ...RegularKeyComponent(txs.SetRegularKey.RegularKey),
      ...FeeComponent(txs.SetRegularKey.Fee),
    ];

    const result = strategy.buildBody(txs.SetRegularKey);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const setRegularKey = { ...txs.SetRegularKey };
    delete setRegularKey.RegularKey;

    const expectedComponents = [
      ...TransactionTypeComponent('SetRegularKey'),
      ...AccountComponent(txs.SetRegularKey.Account),
      ...FeeComponent(txs.SetRegularKey.Fee),
    ];

    const result = strategy.buildBody(setRegularKey);

    expect(result).toEqual(expectedComponents);
  });
});
