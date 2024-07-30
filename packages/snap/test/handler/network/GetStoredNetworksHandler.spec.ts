import type { Network } from '../../../src/core/StateManager';
import { GetStoredNetworksHandler } from '../../../src/handler/network/GetStoredNetworksHandler';
import { StateManagerMock } from '../../__mocks__/core/StateManager.mock';
import { WalletMock } from '../../__mocks__/core/Wallet.mock';

describe('GetStoredNetworksHandler', () => {
  let handler: GetStoredNetworksHandler;
  const walletMock = new WalletMock();
  const stateManagerMock = new StateManagerMock();
  const mockedContext = { wallet: walletMock, stateManager: stateManagerMock };

  beforeEach(() => {
    handler = new GetStoredNetworksHandler(mockedContext as any);
    jest.clearAllMocks();
  });

  test('should return stored networks', async () => {
    const networks: Network[] = [
      { chainId: 1, nodeUrl: 'https://mainnet.node', name: 'XRPL Mainnet' },
      { chainId: 2, nodeUrl: 'https://testnet.node', name: 'XRPL Testnet' },
    ];
    stateManagerMock.get.mockResolvedValue({ networks });

    const result = await handler.handle();

    expect(result).toEqual(networks);
    expect(stateManagerMock.get).toHaveBeenCalledTimes(1);
  });

  test('should return an empty array if there are no stored networks', async () => {
    stateManagerMock.get.mockResolvedValue({ networks: [] });

    const result = await handler.handle();

    expect(result).toEqual([]);
    expect(stateManagerMock.get).toHaveBeenCalledTimes(1);
  });

  test('should return undefined if state does not contain networks', async () => {
    stateManagerMock.get.mockResolvedValue({});

    const result = await handler.handle();

    expect(result).toBeUndefined();
    expect(stateManagerMock.get).toHaveBeenCalledTimes(1);
  });
});
