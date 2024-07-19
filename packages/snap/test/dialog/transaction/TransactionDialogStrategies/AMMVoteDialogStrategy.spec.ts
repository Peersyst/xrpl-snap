import txs from '../../../fixtures/tx';
import { AMMVoteDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/AMMVoteDialogStrategy/AMMVoteDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  AssetComponent,
  Asset2Component,
  TradingFeeComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('AMMVoteDialogStrategy', () => {
  let strategy: AMMVoteDialogStrategy;

  beforeEach(() => {
    strategy = new AMMVoteDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('AMMVote'),
      ...AccountComponent(txs.AMMVote.Account),
      ...AssetComponent(txs.AMMVote.Asset),
      ...Asset2Component(txs.AMMVote.Asset2),
      ...TradingFeeComponent(txs.AMMVote.TradingFee),
      ...FeeComponent(txs.AMMVote.Fee),
    ];

    const result = strategy.buildBody(txs.AMMVote);

    expect(result).toEqual(expectedComponents);
  });
});
