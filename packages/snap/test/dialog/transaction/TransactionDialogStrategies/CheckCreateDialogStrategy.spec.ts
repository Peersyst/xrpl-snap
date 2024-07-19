import {
  TransactionTypeComponent,
  AccountComponent,
  DestinationComponent,
  SendMaxComponent,
  ExpirationComponent,
  DestinationTagComponent,
  InvoiceIDComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { CheckCreateDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/CheckCreateDialogStrategy/CheckCreateDialogStrategy';
import txs from '../../../fixtures/tx';

describe('CheckCreateDialogStrategy', () => {
  let strategy: CheckCreateDialogStrategy;

  beforeEach(() => {
    strategy = new CheckCreateDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('CheckCreate'),
      ...AccountComponent(txs.CheckCreate.Account),
      ...DestinationComponent(txs.CheckCreate.Destination),
      ...SendMaxComponent(txs.CheckCreate.SendMax),
      ...ExpirationComponent(txs.CheckCreate.Expiration),
      ...DestinationTagComponent(txs.CheckCreate.DestinationTag),
      ...InvoiceIDComponent(txs.CheckCreate.InvoiceID),
      ...FeeComponent(txs.CheckCreate.Fee),
    ];

    const result = strategy.buildBody(txs.CheckCreate);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const checkCreate = { ...txs.CheckCreate };
    delete checkCreate.Expiration;
    delete checkCreate.DestinationTag;
    delete checkCreate.InvoiceID;

    const expectedComponents = [
      ...TransactionTypeComponent('CheckCreate'),
      ...AccountComponent(txs.CheckCreate.Account),
      ...DestinationComponent(txs.CheckCreate.Destination),
      ...SendMaxComponent(txs.CheckCreate.SendMax),
      ...FeeComponent(txs.CheckCreate.Fee),
    ];

    const result = strategy.buildBody(checkCreate);

    expect(result).toEqual(expectedComponents);
  });
});
