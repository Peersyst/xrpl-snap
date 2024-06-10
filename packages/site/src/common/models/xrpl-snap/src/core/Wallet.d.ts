import type { Transaction } from 'xrpl';
import type * as xal from 'xrpl-accountlib';

export declare class Wallet {
  readonly account: xal.XRPL_Account;

  readonly address: string;

  readonly publicKey: string;

  readonly privateKey: string;

  constructor(account: xal.XRPL_Account);

  sign(transaction: Transaction): {
    tx_blob: string;
    hash: string;
  };

  signMessage(message: string): string;

  static derive(index: number): Promise<Wallet>;
}
