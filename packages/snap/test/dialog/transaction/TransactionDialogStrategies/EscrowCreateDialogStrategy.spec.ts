import txs from '../../../fixtures/tx';
import { EscrowCreateDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/EscrowCreateDialogStrategy/EscrowCreateDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  DestinationComponent,
  CancelAfterComponent,
  FinishAfterComponent,
  ConditionComponent,
  DestinationTagComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('EscrowCreateDialogStrategy', () => {
  let strategy: EscrowCreateDialogStrategy;

  beforeEach(() => {
    strategy = new EscrowCreateDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('EscrowCreate'),
      ...AccountComponent(txs.EscrowCreate.Account),
      ...DestinationComponent(txs.EscrowCreate.Destination),
      ...CancelAfterComponent(txs.EscrowCreate.CancelAfter),
      ...FinishAfterComponent(txs.EscrowCreate.FinishAfter),
      ...ConditionComponent(txs.EscrowCreate.Condition),
      ...DestinationTagComponent(txs.EscrowCreate.DestinationTag),
      ...FeeComponent(txs.EscrowCreate.Fee),
    ];

    const result = strategy.buildBody(txs.EscrowCreate);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const escrowCreate = { ...txs.EscrowCreate };
    delete escrowCreate.CancelAfter;
    delete escrowCreate.FinishAfter;
    delete escrowCreate.Condition;
    delete escrowCreate.DestinationTag;

    const expectedComponents = [
      ...TransactionTypeComponent('EscrowCreate'),
      ...AccountComponent(txs.EscrowCreate.Account),
      ...DestinationComponent(txs.EscrowCreate.Destination),
      ...FeeComponent(txs.EscrowCreate.Fee),
    ];

    const result = strategy.buildBody(escrowCreate);

    expect(result).toEqual(expectedComponents);
  });
});
