import {
  TransactionTypeComponent,
  AccountComponent,
  SignerQuorumComponent,
  SignerEntriesComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { SignerListSetDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/SignerListSetDialogStrategy/SignerListSetDialogStrategy';
import txs from '../../../fixtures/tx';

describe('SignerListSetDialogStrategy', () => {
  let strategy: SignerListSetDialogStrategy;

  beforeEach(() => {
    strategy = new SignerListSetDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('SignerListSet'),
      ...AccountComponent(txs.SignerListSet.Account),
      ...SignerQuorumComponent(txs.SignerListSet.SignerQuorum),
      ...SignerEntriesComponent(txs.SignerListSet.SignerEntries),
      ...FeeComponent(txs.SignerListSet.Fee),
    ];

    const result = strategy.buildBody(txs.SignerListSet);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const signerListSet = { ...txs.SignerListSet };
    delete signerListSet.SignerEntries;

    const expectedComponents = [
      ...TransactionTypeComponent('SignerListSet'),
      ...AccountComponent(txs.SignerListSet.Account),
      ...SignerQuorumComponent(txs.SignerListSet.SignerQuorum),
      ...FeeComponent(txs.SignerListSet.Fee),
    ];

    const result = strategy.buildBody(signerListSet);

    expect(result).toEqual(expectedComponents);
  });
});
