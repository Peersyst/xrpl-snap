import {
  TransactionTypeComponent,
  AccountComponent,
  OwnerComponent,
  OfferSequenceComponent,
  ConditionComponent,
  FulfillmentComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { EscrowFinishDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/EscrowFinishDialogStrategy/EscrowFinishDialogStrategy';
import txs from '../../../fixtures/tx';

describe('EscrowFinishDialogStrategy', () => {
  let strategy: EscrowFinishDialogStrategy;

  beforeEach(() => {
    strategy = new EscrowFinishDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('EscrowFinish'),
      ...AccountComponent(txs.EscrowFinish.Account),
      ...OwnerComponent(txs.EscrowFinish.Owner),
      ...OfferSequenceComponent(txs.EscrowFinish.OfferSequence),
      ...ConditionComponent(txs.EscrowFinish.Condition),
      ...FulfillmentComponent(txs.EscrowFinish.Fulfillment),
      ...FeeComponent(txs.EscrowFinish.Fee),
    ];

    const result = strategy.buildBody(txs.EscrowFinish);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const escrowFinish = { ...txs.EscrowFinish };
    delete escrowFinish.Condition;
    delete escrowFinish.Fulfillment;

    const expectedComponents = [
      ...TransactionTypeComponent('EscrowFinish'),
      ...AccountComponent(txs.EscrowFinish.Account),
      ...OwnerComponent(txs.EscrowFinish.Owner),
      ...OfferSequenceComponent(txs.EscrowFinish.OfferSequence),
      ...FeeComponent(txs.EscrowFinish.Fee),
    ];

    const result = strategy.buildBody(escrowFinish);

    expect(result).toEqual(expectedComponents);
  });
});
