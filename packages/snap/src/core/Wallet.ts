/* eslint-disable lines-between-class-members */
/* eslint-disable no-restricted-syntax */
import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { sign, deriveAddress } from 'ripple-keypairs';
import { type Transaction, Wallet as XrplWallet } from 'xrpl';

import { bip44CompressedPublicKeyToXRPPublicKey, bip44PrivateKeyToXRPPrivateKey } from './utils/wallet-utils';

export class Wallet {
  private readonly _wallet: XrplWallet;

  constructor(private readonly _address: string, private readonly _publicKey: string, private readonly _privateKey: string) {
    this._wallet = new XrplWallet(_publicKey, _privateKey);
  }

  get address(): string {
    return this._address;
  }

  get publicKey(): string {
    return this._publicKey;
  }

  get privateKey(): string {
    return this._privateKey;
  }

  public sign(transaction: Transaction): { tx_blob: string; hash: string } {
    return this._wallet.sign(transaction);
  }

  public signMessage(message: string): string {
    return sign(message, this._privateKey);
  }

  public static async derive(addressIndex = 0): Promise<Wallet> {
    const xrplNode = await snap.request({
      method: 'snap_getBip44Entropy',
      params: {
        coinType: 144, // XRP coin_type
      },
    });

    const bip44AddressKeyDeriver = await getBIP44AddressKeyDeriver(xrplNode);

    /**
     * Derive the BIP44 node for the XRP account. BIB44 levels structure:
     * m / 44' / coin_type' / account' / change / address_index
     * m / 44' / 144' / 0' / 0 / `addressIndex`
     */
    const bip44Node = await bip44AddressKeyDeriver(addressIndex);

    const xrpPrivateKey = bip44PrivateKeyToXRPPrivateKey(bip44Node.privateKey as string);
    /**
     * Use the compressed public key
     * @see https://xrpl.org/docs/concepts/accounts/cryptographic-keys/#secp256k1-key-derivation
     */
    const xrpPublicKey = bip44CompressedPublicKeyToXRPPublicKey(bip44Node.compressedPublicKey);

    const classicAddress = deriveAddress(xrpPublicKey);

    return new Wallet(classicAddress, xrpPublicKey, xrpPrivateKey);
  }
}
