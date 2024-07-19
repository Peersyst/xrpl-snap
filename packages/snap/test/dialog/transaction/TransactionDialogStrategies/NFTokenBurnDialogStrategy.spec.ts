import {
  TransactionTypeComponent,
  AccountComponent,
  NFTokenIDComponent,
  OwnerComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { NFTokenBurnDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/NFTokenBurnDialogStrategy/NFTokenBurnDialogStrategy';
import txs from '../../../fixtures/tx';

describe('NFTokenBurnDialogStrategy', () => {
  let strategy: NFTokenBurnDialogStrategy;

  beforeEach(() => {
    strategy = new NFTokenBurnDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('NFTokenBurn'),
      ...AccountComponent(txs.NFTokenBurn.Account),
      ...NFTokenIDComponent(txs.NFTokenBurn.NFTokenID),
      ...OwnerComponent(txs.NFTokenBurn.Owner),
      ...FeeComponent(txs.NFTokenBurn.Fee),
    ];

    const result = strategy.buildBody(txs.NFTokenBurn);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const nftokenBurn = { ...txs.NFTokenBurn };
    delete nftokenBurn.Owner;

    const expectedComponents = [
      ...TransactionTypeComponent('NFTokenBurn'),
      ...AccountComponent(txs.NFTokenBurn.Account),
      ...NFTokenIDComponent(txs.NFTokenBurn.NFTokenID),
      ...FeeComponent(txs.NFTokenBurn.Fee),
    ];

    const result = strategy.buildBody(nftokenBurn);

    expect(result).toEqual(expectedComponents);
  });
});
