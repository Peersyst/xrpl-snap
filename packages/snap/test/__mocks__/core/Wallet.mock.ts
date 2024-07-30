export const MOCKED_ADDRESS = 'rDk7FQvkQxQQNGTtfM2Fr66s7Nm3k87vdS';
export const MOCKED_PUBLIC_KEY = '0369C9BC4D18FAE741898828A1F48E53E53F6F3DB3191441CC85A14D4FC140E031';
export const MOCKED_PRIVATE_KEY = '000000000000000000000000000000000000000000000000000000000000000000';

export class WalletMock {
  address = MOCKED_ADDRESS;

  publicKey = MOCKED_PUBLIC_KEY;

  privateKey = MOCKED_PRIVATE_KEY;

  sign = jest.fn().mockResolvedValue({ tx_blob: 'tx_blob', hash: 'hash' });

  signMessage = jest.fn().mockResolvedValue('signature');

  static derive = jest.fn().mockResolvedValue(new WalletMock());
}
