import * as MetamaskKeyTree from '@metamask/key-tree';
import type { BIP44AddressKeyDeriver } from '@metamask/key-tree';

import { bip44CompressedPublicKeyToXRPPublicKey, bip44PrivateKeyToXRPPrivateKey } from '../../src/core/utils/wallet-utils';
import { Wallet } from '../../src/core/Wallet'; // adjust the path accordingly
import requests from '../fixtures/requests';
import responses from '../fixtures/responses';

describe('Wallet functions', () => {
  const mockXRPPrivateKey = 'B6FE8507D977E46E988A8A94DB3B8B35E404B60F8B11AC5213FA8B5ABC8A8D19';
  const mockXRPPublicKey = '03BFC2F7AE242C3493187FA0B72BE97B2DF71194FB772E507FF9DEA0AD13CA1625';
  const mockClassicAddress = 'rQKQsPeE3iTRyfUypLhuq74gZdcRdwWqDp';

  const mockBip44Node = {
    privateKey: mockXRPPrivateKey,
    compressedPublicKey: mockXRPPublicKey,
  };

  const mockedGetBIP44AddressKeyDeriver = jest.fn().mockResolvedValue(mockBip44Node) as unknown as BIP44AddressKeyDeriver;

  jest.spyOn(MetamaskKeyTree, 'getBIP44AddressKeyDeriver').mockResolvedValue(mockedGetBIP44AddressKeyDeriver);

  describe('derive', () => {
    test('Creates wallet correctly', async () => {
      const wallet = await Wallet.derive(0);

      expect(wallet).toBeInstanceOf(Wallet);
      expect(wallet.privateKey).toBe(bip44PrivateKeyToXRPPrivateKey(mockXRPPrivateKey));
      expect(wallet.publicKey).toBe(bip44CompressedPublicKeyToXRPPublicKey(mockXRPPublicKey));
      expect(wallet.address).toBe(mockClassicAddress);
    });
  });

  describe('sign', () => {
    let wallet: Wallet;

    beforeEach(async () => {
      wallet = await Wallet.derive(0);
    });

    test('Signs transaction correctly', () => {
      const normalTxRequest = requests.sign.normal;

      const signedTx = wallet.sign(normalTxRequest);

      expect(signedTx.tx_blob).toBe(responses.sign.normal.signedTransaction);
    });

    test('Signs message correctly', () => {
      const signedMessage = wallet.signMessage('1234');

      expect(isHex(signedMessage)).toBe(true);
    });
  });
});

function isHex(str: string): boolean {
  return /^[A-F0-9]+$/iu.test(str);
}
