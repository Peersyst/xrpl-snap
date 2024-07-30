import { GetAccountHandler } from '../../../src/handler/account/GetAccountHandler';
import { WalletMock } from '../../__mocks__/core/Wallet.mock';

describe('GetAccountHandler', () => {
  let handler: GetAccountHandler;
  const walletMock = new WalletMock();
  const mockedContext = { wallet: walletMock };

  beforeEach(() => {
    handler = new GetAccountHandler(mockedContext as any);
  });

  test('should return the correct account details', async () => {
    const result = await handler.handle();

    expect(result).toEqual({
      account: walletMock.address,
      publicKey: walletMock.publicKey,
    });
  });
});
