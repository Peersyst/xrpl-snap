import txs from '../../../fixtures/tx';
import { TicketCreateDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/TicketCreateDialogStrategy/TicketCreateDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  TicketCountComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('TicketCreateDialogStrategy', () => {
  let strategy: TicketCreateDialogStrategy;

  beforeEach(() => {
    strategy = new TicketCreateDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('TicketCreate'),
      ...AccountComponent(txs.TicketCreate.Account),
      ...TicketCountComponent(txs.TicketCreate.TicketCount),
      ...FeeComponent(txs.TicketCreate.Fee),
    ];

    const result = strategy.buildBody(txs.TicketCreate);

    expect(result).toEqual(expectedComponents);
  });
});
