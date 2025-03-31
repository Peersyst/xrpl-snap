/* eslint-disable */
/**
 *
 * THIS RPC CLIENT HAS BEEN MODIFIED FROM THE WS CLIENT OF THE xrpl.js LIBRARY
 *
 */
import { XrplResponse } from '../Provider';
import { type Request as XrplRequest, type SubmittableTransaction, setTransactionFlagsToNumber, ValidationError } from 'xrpl';
import {
  calculateFeePerTransactionType,
  checkAccountDeleteBlockers,
  setLatestValidatedLedgerSequence,
  setNextValidSequenceNumber,
  setValidAddresses,
  txNeedsNetworkID,
} from './utils/autofill';
import { areAmountsEqual } from './utils/areAmountsEqual';

const DEFAULT_FEE_CUSHION = 1.2;
const DEFAULT_MAX_FEE_XRP = '2';

export class RPCClient {
  /**
   * Factor to multiply estimated fee by to provide a cushion in case the
   * required fee rises during submission of a transaction. Defaults to 1.2.
   *
   * @category Fee
   */
  public readonly feeCushion: number;

  /**
   * Maximum transaction cost to allow, in decimal XRP. Must be a string-encoded
   * number. Defaults to '2'.
   *
   * @category Fee
   */
  public readonly maxFeeXRP: string;
  /**
   * Network ID of the server this client is connected to
   *
   */
  public networkID: number | undefined;

  /**
   * Rippled Version used by the server this client is connected to
   *
   */
  public buildVersion: string | undefined;
  /**
   * The URL of the node this client is connected to
   */
  public url: string;

  /**
   * Whether the client is connected to the server
   */
  private isConnected = false;

  constructor(url: string) {
    this.url = url;
    this.feeCushion = DEFAULT_FEE_CUSHION;
    this.maxFeeXRP = DEFAULT_MAX_FEE_XRP;
  }

  async connect(): Promise<void> {
    await this.getServerInfo();
  }

  public async getServerInfo(): Promise<void> {
    try {
      const response = await this.request({
        command: 'server_info',
      });
      this.networkID = response.result.info.network_id ?? undefined;
      this.buildVersion = response.result.info.build_version;
      this.isConnected = true;
    } catch (error) {
      this.isConnected = false;
      // Silent failure - connection status is tracked via isConnected flag
    }
  }

  async getLedgerIndex(): Promise<number> {
    const ledgerResponse = await this.request({
      command: 'ledger',
      ledger_index: 'validated',
    });
    return ledgerResponse.result.ledger_index;
  }

  public async request<Request extends XrplRequest>(req: Request): Promise<XrplResponse<Request>> {
    const res = await fetch(this.url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({
        method: req.command,
        params: [req],
      }),
    });
    const resJson: XrplResponse<Request> & { result: { error: string } } = await res.json();
    if (resJson.result.error) {
      throw new Error(`Error calling ${req.command} - ${resJson.result.error}`);
    }
    return resJson;
  }

  public async autofill<T extends SubmittableTransaction>(transaction: T, signersCount?: number): Promise<T> {
    if (!this.isConnected) await this.connect();

    const tx = { ...transaction };

    setValidAddresses(tx);
    setTransactionFlagsToNumber(tx);

    const promises: Array<Promise<void>> = [];
    if (tx.NetworkID == null) {
      tx.NetworkID = txNeedsNetworkID(this) ? this.networkID : undefined;
    }
    if (tx.Sequence == null) {
      promises.push(setNextValidSequenceNumber(this, tx));
    }
    if (tx.Fee == null) {
      promises.push(calculateFeePerTransactionType(this, tx, signersCount));
    }
    if (tx.LastLedgerSequence == null) {
      promises.push(setLatestValidatedLedgerSequence(this, tx));
    }
    if (tx.TransactionType === 'AccountDelete') {
      promises.push(checkAccountDeleteBlockers(this, tx));
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore type-assertions on the DeliverMax property
    // @ts-expect-error -- DeliverMax property exists only at the RPC level, not at the protocol level
    if (tx.TransactionType === 'Payment' && tx.DeliverMax != null) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- This is a valid null check for Amount
      if (tx.Amount == null) {
        // If only DeliverMax is provided, use it to populate the Amount field
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore type-assertions on the DeliverMax property
        // @ts-expect-error -- DeliverMax property exists only at the RPC level, not at the protocol level
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- DeliverMax is a known RPC-level property
        tx.Amount = tx.DeliverMax;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore type-assertions on the DeliverMax property
      // @ts-expect-error -- DeliverMax property exists only at the RPC level, not at the protocol level
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- This is a valid null check for Amount
      if (tx.Amount != null && !areAmountsEqual(tx.Amount, tx.DeliverMax)) {
        return Promise.reject(
          new ValidationError('PaymentTransaction: Amount and DeliverMax fields must be identical when both are provided'),
        );
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore type-assertions on the DeliverMax property
      // @ts-expect-error -- DeliverMax property exists only at the RPC level, not at the protocol level
      delete tx.DeliverMax;
    }

    return Promise.all(promises).then(() => tx);
  }
}
