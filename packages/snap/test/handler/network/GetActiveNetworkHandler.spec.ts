import { GetActiveNetworkHandler } from '../../../src/handler/network/GetActiveNetworkHandler';
import { StateManagerMock } from '../../__mocks__/core/StateManager.mock';
import { WalletMock } from '../../__mocks__/core/Wallet.mock';

describe('GetActiveNetworkHandler', () => {
  let handler: GetActiveNetworkHandler;
  const walletMock = new WalletMock();
  const stateManagerMock = new StateManagerMock();
  const mockedContext = { wallet: walletMock, stateManager: stateManagerMock };

  beforeEach(() => {
    handler = new GetActiveNetworkHandler(mockedContext as any);
    jest.clearAllMocks();
  });

  test('should return the active network', async () => {
    const activeNetwork = { chainId: 1, nodeUrl: 'https://mainnet.node' };
    stateManagerMock.get.mockResolvedValue({ activeNetwork });

    const result = await handler.handle();

    expect(result).toEqual(activeNetwork);
    expect(stateManagerMock.get).toHaveBeenCalledTimes(1);
  });

  test('should return undefined if there is no active network', async () => {
    stateManagerMock.get.mockResolvedValue({});

    const result = await handler.handle();

    expect(result).toBeUndefined();
    expect(stateManagerMock.get).toHaveBeenCalledTimes(1);
  });
});
