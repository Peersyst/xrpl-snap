/* eslint-disable lines-between-class-members */
import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { encode, encodeForSigning } from '@xrpl-snap/ripple-binary-codec';
import { sign } from 'ripple-keypairs';
import type { Transaction } from 'xrpl';
import * as xal from 'xrpl-accountlib';

export class Wallet {
  public readonly address: string;
  public readonly publicKey: string;
  public readonly privateKey: string;
  public readonly familySeed: string;

  constructor(public readonly account: xal.XRPL_Account) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.address = account.address!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.publicKey = account.keypair.publicKey!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.privateKey = account.keypair.privateKey!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.familySeed = account.secret.familySeed!;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public sign(transaction: Transaction): { tx_blob: string; hash: string } {
    // must be without signers or already signed
    if (transaction.TxnSignature || transaction.Signers) {
      throw new Error('Transaction must not contain TxnSignature or Signers');
    }

    transaction.SigningPubKey = this.publicKey;
    const signingData = encodeForSigning(transaction);
    transaction.TxnSignature = sign(signingData, this.privateKey);

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      tx_blob: encode(transaction),
      hash: '', // TODO: hashSignedTx(serialized),
    };
  }

  // Todo: Implement
  public signMessage(message: string): string {
    throw new Error(`implement signMessage ${message}`);
  }

  public static async derive(index: number) {
    const xrplNode = await snap.request({
      method: 'snap_getBip44Entropy',
      params: {
        coinType: 144,
      },
    });

    const deriveXrpAddress = await getBIP44AddressKeyDeriver(xrplNode);

    const addressKey0 = await deriveXrpAddress(index);

    const data = str2ab(addressKey0.privateKey as string);
    const familySeedData = xal.generate.familySeed({
      entropy: data,
    });

    return new Wallet(familySeedData);
  }
}

function str2ab(str: string): Uint8Array {
  // eslint-disable-next-line id-denylist
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return bufView;
}
