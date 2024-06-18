/* eslint-disable lines-between-class-members */
import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { encode, encodeForSigning } from '@xrpl-snap/ripple-binary-codec';
import { sign, deriveAddress } from 'ripple-keypairs';
import type { Transaction } from 'xrpl';

export class Wallet {
  constructor(public readonly address: string, public readonly publicKey: string, public readonly privateKey: string) {}

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public sign(transaction: Transaction): { tx_blob: string; hash: string } {
    // must be without signers or already signed
    if (transaction.TxnSignature || transaction.Signers) {
      throw new Error('Transaction must not contain TxnSignature or Signers');
    }

    const txToSignAndEncode = { ...transaction };

    txToSignAndEncode.SigningPubKey = this.publicKey;

    txToSignAndEncode.TxnSignature = computeSignature(txToSignAndEncode, this.privateKey);

    const serialized = encode(txToSignAndEncode);

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      tx_blob: serialized,
      hash: '', // TODO: hashSignedTx(serialized),
    };
  }

  // Todo: Implement
  public signMessage(message: string): string {
    throw new Error(`implement signMessage ${message}`);
  }

  public static async derive(addressIndex = 0) {
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
}

function bip44PrivateKeyToXRPPrivateKey(privateKey: string): string {
  return `00${removeHexPreffix(privateKey).toUpperCase()}`;
}

function bip44CompressedPublicKeyToXRPPublicKey(compressedPublicKey: string): string {
  return removeHexPreffix(compressedPublicKey).toUpperCase();
}

function removeHexPreffix(hexString: string): string {
  if (hexString.startsWith('0x')) {
    return hexString.slice(2);
  }
  return hexString;
}

function computeSignature(tx: Transaction, privateKey: string): string {
  return sign(encodeForSigning(tx), privateKey);
}
