import txs from '../../../fixtures/tx';
import { DepositPreauthDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/DepositPreauthDialogStrategy/DepositPreauthDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  AuthorizeComponent,
  UnauthorizeComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('DepositPreauthDialogStrategy', () => {
  let strategy: DepositPreauthDialogStrategy;

  beforeEach(() => {
    strategy = new DepositPreauthDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('DepositPreauth'),
      ...AccountComponent(txs.DepositPreauth.Account),
      ...AuthorizeComponent(txs.DepositPreauth.Authorize),
      ...UnauthorizeComponent(txs.DepositPreauth.Unauthorize),
      ...FeeComponent(txs.DepositPreauth.Fee),
    ];

    const result = strategy.buildBody(txs.DepositPreauth);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const depositPreauth = { ...txs.DepositPreauth };
    delete depositPreauth.Authorize;
    delete depositPreauth.Unauthorize;

    const expectedComponents = [
      ...TransactionTypeComponent('DepositPreauth'),
      ...AccountComponent(txs.DepositPreauth.Account),
      ...FeeComponent(txs.DepositPreauth.Fee),
    ];

    const result = strategy.buildBody(depositPreauth);

    expect(result).toEqual(expectedComponents);
  });
});
