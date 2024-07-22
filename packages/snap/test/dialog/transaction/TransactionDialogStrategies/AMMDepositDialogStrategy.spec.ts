import {
  TransactionTypeComponent,
  AccountComponent,
  AssetComponent,
  Asset2Component,
  AmountComponent,
  Amount2Component,
  EPriceComponent,
  LPTokenOutComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { AMMDepositDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/AMMDepositDialogStrategy/AMMDepositDialogStrategy';
import txs from '../../../fixtures/tx';

describe('AMMDepositDialogStrategy', () => {
  let strategy: AMMDepositDialogStrategy;

  beforeEach(() => {
    strategy = new AMMDepositDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('AMMDeposit'),
      ...AccountComponent(txs.AMMDeposit.Account),
      ...AssetComponent(txs.AMMDeposit.Asset),
      ...Asset2Component(txs.AMMDeposit.Asset2),
      ...AmountComponent(txs.AMMDeposit.Amount),
      ...Amount2Component(txs.AMMDeposit.Amount2),
      ...EPriceComponent(txs.AMMDeposit.EPrice),
      ...LPTokenOutComponent(txs.AMMDeposit.LPTokenOut),
      ...FeeComponent(txs.AMMDeposit.Fee),
    ];

    const result = strategy.buildBody(txs.AMMDeposit);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const ammDeposit = { ...txs.AMMDeposit };
    delete ammDeposit.EPrice;
    delete ammDeposit.LPTokenOut;

    const expectedComponents = [
      ...TransactionTypeComponent('AMMDeposit'),
      ...AccountComponent(txs.AMMDeposit.Account),
      ...AssetComponent(txs.AMMDeposit.Asset),
      ...Asset2Component(txs.AMMDeposit.Asset2),
      ...AmountComponent(txs.AMMDeposit.Amount),
      ...Amount2Component(txs.AMMDeposit.Amount2),
      ...FeeComponent(txs.AMMDeposit.Fee),
    ];

    const result = strategy.buildBody(ammDeposit);

    expect(result).toEqual(expectedComponents);
  });
});
