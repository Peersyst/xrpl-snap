import { SignAndSubmitHandler } from '../../../src/handler/transaction/SignAndSubmitHandler';
import { SignHandler } from '../../../src/handler/transaction/SignHandler';
import { SubmitHandler } from '../../../src/handler/transaction/SubmitHandler';

describe('SignAndSubmitHandler', () => {
  let handler: SignAndSubmitHandler;

  const mockedSignedTransaction = { tx_blob: 'signed_blob', hash: 'signed_hash' };

  const mockedSignHandle = jest.fn().mockResolvedValue(mockedSignedTransaction);

  const signHandlerMock = {
    handle: mockedSignHandle,
  };

  const mockedSubmitResponse = { result: 'tesSUCCESS' };
  const mockedSubmitHandle = jest.fn().mockResolvedValue(mockedSubmitResponse);

  const submitHandlerMock = {
    handle: mockedSubmitHandle,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(SignHandler.prototype, 'handle').mockImplementation(signHandlerMock.handle);
    jest.spyOn(SubmitHandler.prototype, 'handle').mockImplementation(submitHandlerMock.handle);

    handler = new SignAndSubmitHandler({} as any);
  });

  test('should sign and submit transaction', async () => {
    const txParams = { TransactionType: 'Payment', Account: 'rXYZ', Amount: '1000' };

    const result = await handler.handle('https://origin', txParams as any);

    expect(result).toEqual(mockedSubmitResponse);
    expect(mockedSignHandle).toHaveBeenCalledWith('https://origin', txParams);
    expect(mockedSubmitHandle).toHaveBeenCalledWith('https://origin', mockedSignedTransaction);
    expect(mockedSignHandle).toHaveBeenCalledTimes(1);
    expect(mockedSubmitHandle).toHaveBeenCalledTimes(1);
  });
});
