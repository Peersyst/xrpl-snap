/* eslint-disable lines-between-class-members */
import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { encode, encodeForSigning } from '@xrpl-snap/ripple-binary-codec';
import { sign, deriveAddress } from 'ripple-keypairs';
import { type Transaction } from 'xrpl';
import { hashSignedTx } from 'xrpl/dist/npm/utils/hashes';

import { bip44CompressedPublicKeyToXRPPublicKey, bip44PrivateKeyToXRPPrivateKey } from './utils/wallet-utils';

export class Wallet {
  constructor(public readonly address: string, public readonly publicKey: string, public readonly privateKey: string) {}

  public sign(transaction: Transaction): { tx_blob: string; hash: string } {
    // must be without signers or already signed
    if (transaction.TxnSignature || transaction.Signers) {
      throw new Error('Transaction must not contain TxnSignature or Signers');
    }

    const txToSignAndEncode = { ...transaction };

    txToSignAndEncode.SigningPubKey = this.publicKey;

    txToSignAndEncode.TxnSignature = this._computeTxSignature(txToSignAndEncode);

    const serialized = encode(txToSignAndEncode);

    return {
      tx_blob: serialized,
      hash: hashSignedTx(serialized),
    };
  }

  public signMessage(message: string): string {
    return this._computeSignature(message);
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

  _computeTxSignature(tx: Transaction): string {
    return this._computeSignature(encodeForSigning(tx));
  }

  _computeSignature(message: string): string {
    return sign(message, this.privateKey);
  }
}
