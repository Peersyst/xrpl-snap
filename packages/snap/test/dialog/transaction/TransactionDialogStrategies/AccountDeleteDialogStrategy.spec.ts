import txs from '../../../fixtures/tx';
import { AccountDeleteDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/AccountDeleteDialogStrategy/AccountDeleteDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  DestinationComponent,
  DestinationTagComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('AccountDeleteDialogStrategy', () => {
  let strategy: AccountDeleteDialogStrategy;

  beforeEach(() => {
    strategy = new AccountDeleteDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('AccountDelete'),
      ...AccountComponent(txs.AccountDelete.Account),
      ...DestinationComponent(txs.AccountDelete.Destination),
      ...DestinationTagComponent(txs.AccountDelete.DestinationTag),
      ...FeeComponent(txs.AccountDelete.Fee),
    ];

    const result = strategy.buildBody(txs.AccountDelete);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const accountDelete = { ...txs.AccountDelete };
    delete accountDelete.DestinationTag;

    const expectedComponents = [
      ...TransactionTypeComponent('AccountDelete'),
      ...AccountComponent(txs.AccountDelete.Account),
      ...DestinationComponent(txs.AccountDelete.Destination),
      ...FeeComponent(txs.AccountDelete.Fee),
    ];

    const result = strategy.buildBody(accountDelete);

    expect(result).toEqual(expectedComponents);
  });
});
