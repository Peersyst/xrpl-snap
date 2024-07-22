import {
  TransactionTypeComponent,
  AccountComponent,
  TakerGetsComponent,
  TakerPaysComponent,
  OfferSequenceComponent,
  ExpirationComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { OfferCreateDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/OfferCreateDialogStrategy/OfferCreateDialogStrategy';
import txs from '../../../fixtures/tx';

describe('OfferCreateDialogStrategy', () => {
  let strategy: OfferCreateDialogStrategy;

  beforeEach(() => {
    strategy = new OfferCreateDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('OfferCreate'),
      ...AccountComponent(txs.OfferCreate.Account),
      ...TakerGetsComponent(txs.OfferCreate.TakerGets),
      ...TakerPaysComponent(txs.OfferCreate.TakerPays),
      ...OfferSequenceComponent(txs.OfferCreate.OfferSequence),
      ...ExpirationComponent(txs.OfferCreate.Expiration),
      ...FeeComponent(txs.OfferCreate.Fee),
    ];

    const result = strategy.buildBody(txs.OfferCreate);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const offerCreate = { ...txs.OfferCreate };
    delete offerCreate.OfferSequence;
    delete offerCreate.Expiration;

    const expectedComponents = [
      ...TransactionTypeComponent('OfferCreate'),
      ...AccountComponent(txs.OfferCreate.Account),
      ...TakerGetsComponent(txs.OfferCreate.TakerGets),
      ...TakerPaysComponent(txs.OfferCreate.TakerPays),
      ...FeeComponent(txs.OfferCreate.Fee),
    ];

    const result = strategy.buildBody(offerCreate);

    expect(result).toEqual(expectedComponents);
  });
});
