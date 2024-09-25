import { TokenWithBalance } from 'common/models';
import Amount from 'common/utils/Amount';
import RepositoryErrorCodes from 'data-access/repository/error/RepositoryErrorCodes';
import { AccountNFTsResponse, AccountTxResponse, Client, TxResponse } from 'xrpl';

import RepositoryError from '../error/RepositoryError';
import { XrplErrorCodes } from './XrplErrorCodes';

export class XrplService {
  private nodeUrl: string;

  private _client: Client;

  /**
   * Checks the client connection
   * If client is connected and heartbeat interval has passed, sends a ping request and reconnects if disconnected
   * If client is connected and heartbeat interval has not passed do nothing
   * If client is not connected reconnect
   */
  private async clientHeartbeat(): Promise<void> {
    try {
      await this._client.request({ command: 'ping' });
    } catch (e) {
      await this.reconnectClient();
    }
  }

  /**
   * Getter for the Client
   */
  private async getClient() {
    try {
      await this.clientHeartbeat();
    } catch (_e) {
      throw new RepositoryError(XrplErrorCodes.CLIENT_NOT_INITIALIZED);
    }

    return this._client;
  }

  /**
   * Initializes the client
   */
  private async initializeClient(): Promise<void> {
    this._client = new Client(this.nodeUrl);

    await this._client.connect();
  }

  /**
   * Reconnects the client
   */
  private async reconnectClient(): Promise<void> {
    await this._client.disconnect();
    await this.initializeClient();
  }

  async load(nodeUrl: string): Promise<void> {
    this.nodeUrl = nodeUrl;

    await this.unload();

    await this.initializeClient();
  }

  async unload(): Promise<void> {
    if (this._client?.isConnected()) {
      await this._client.disconnect();
    }
  }

  /**
   * /**
   * Gets all tokens of an account
   * @param account - Address of the account
   * @param marker - Marker for pagination
   * @param limit - Limit of tokens to fetch
   */
  async getNfts(account: string, marker: unknown, limit = 5): Promise<AccountNFTsResponse> {
    const client = await this.getClient();
    return await client.request({
      command: 'account_nfts',
      account,
      limit,
      marker,
    });
  }

  public async getAccountInfo(account: string): Promise<any & { signer_lists?: any[] }> {
    const client = await this.getClient();
    const { result } = await client.request({
      command: 'account_info',
      account,
    });

    if ('account_data' in result) {
      return result.account_data;
    }
    throw new RepositoryError(RepositoryErrorCodes.ACCOUNT_NOT_FOUND);
  }

  /**
   * Gets all tokens of an account
   * @param account - Address of the account
   */
  async getIOUTokens(account: string): Promise<TokenWithBalance[]> {
    const client = await this.getClient();
    try {
      let res = await client.request({ command: 'account_lines', account });

      const { lines } = res.result;

      while (res.result.marker && res.result.lines.length > 0) {
        res = await client.request({
          command: 'account_lines',
          account,
          marker: res.result.marker,
        });
        lines.push(...res.result.lines);
      }

      return lines.map((line) => {
        const token = {
          currency: line.currency,
          issuer: line.account,
          decimals: 15,
        };
        const [int, dec] = line.balance?.split('.') || [];

        return {
          ...token,
          balance: Amount.fromDecToken(dec ? `${int}.${dec.slice(0, 14)}` : int, token),
        };
      });
    } catch (e) {
      return [];
    }
  }

  public async getAccountTransactions(account: string, marker?: unknown, limit = 25): Promise<AccountTxResponse> {
    const client = await this.getClient();
    return await client.request({ command: 'account_tx', account, marker, limit });
  }

  public async getTransaction(hash: string): Promise<TxResponse> {
    const client = await this.getClient();
    return await client.request({ command: 'tx', transaction: hash });
  }
}
