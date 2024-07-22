import {
  TransactionTypeComponent,
  AccountComponent,
  FeeComponent,
  ClearFlagComponent,
  DomainComponent,
  EmailHashComponent,
  MessageKeyComponent,
  TickSizeComponent,
  TransferRateComponent,
  NFTokenMinterComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { AccountSetDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/AccountSetDialogStrategy/AccountSetDialogStrategy';
import txs from '../../../fixtures/tx';

describe('AccountSetDialogStrategy', () => {
  let strategy: AccountSetDialogStrategy;

  beforeEach(() => {
    strategy = new AccountSetDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('AccountSet'),
      ...AccountComponent(txs.AccountSet.Account),
      ...FeeComponent(txs.AccountSet.Fee),
      ...ClearFlagComponent(txs.AccountSet.ClearFlag),
      ...DomainComponent(txs.AccountSet.Domain),
      ...EmailHashComponent(txs.AccountSet.EmailHash),
      ...MessageKeyComponent(txs.AccountSet.MessageKey),
      ...TickSizeComponent(txs.AccountSet.TickSize),
      ...TransferRateComponent(txs.AccountSet.TransferRate),
      ...NFTokenMinterComponent(txs.AccountSet.NFTokenMinter),
    ];

    const result = strategy.buildBody(txs.AccountSet);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const accountSet = { ...txs.AccountSet };
    delete accountSet.ClearFlag;
    delete accountSet.Domain;
    delete accountSet.EmailHash;
    delete accountSet.MessageKey;
    delete accountSet.TickSize;
    delete accountSet.TransferRate;
    delete accountSet.NFTokenMinter;

    const expectedComponents = [
      ...TransactionTypeComponent('AccountSet'),
      ...AccountComponent(txs.AccountSet.Account),
      ...FeeComponent(txs.AccountSet.Fee),
    ];

    const result = strategy.buildBody(accountSet);

    expect(result).toEqual(expectedComponents);
  });
});
