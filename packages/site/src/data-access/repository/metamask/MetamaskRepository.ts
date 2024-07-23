import type { EIP6963AnnounceProviderEvent, MetaMaskInpageProvider, RequestArguments } from '@metamask/providers';
import { config } from 'common/config';
import type { TokenWithBalance } from 'common/models/token';
import type { HandlerMethod, HandlerParams, HandlerReturns } from 'common/models/xrpl-snap/src/handler/Handler.types';
import { parseCurrencyCode } from 'common/utils/token/currencyCode';
import type { AccountLinesResponse, AccountTxResponse, SubmitResponse, Amount as XrplAmount } from 'xrpl';

import type { Network } from '../../../common/models/network/network.types';
import type { GetSnapsResponse } from '../../../common/models/snap';
import Amount from '../../../common/utils/Amount';
import RepositoryError from '../error/RepositoryError';
import RepositoryErrorCodes from '../error/RepositoryErrorCodes';
import { MetamaskErrorCodes } from './MetamaskErrorCodes';
import { withMetamaskError } from './utils/MetamaskError';

export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export class MetamaskRepository {
  public provider?: MetaMaskInpageProvider | null;

  public async onInit() {
    this.provider = await this.getProvider();
  }

  public async getSnaps(): Promise<GetSnapsResponse> {
    return (await this.request({
      method: 'wallet_getSnaps',
    })) as Promise<GetSnapsResponse>;
  }

  public async requestSnap(snapId: string) {
    await withMetamaskError(async () => {
      await this.request({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: {},
        },
      });
    });
  }

  public async getWallet() {
    return this.invokeSnap({
      method: 'xrpl_getAccount',
      params: undefined,
    });
  }

  public async getAccountInfo(account: string): Promise<any & { signer_lists?: any[] }> {
    const { result } = await this.invokeSnap({
      method: 'xrpl_request',
      params: { command: 'account_info', account },
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
    try {
      const res = (await this.invokeSnap({
        method: 'xrpl_request',
        params: { command: 'account_lines', account },
      })) as AccountLinesResponse;

      const { lines } = res.result;

      while (res.result.marker && res.result.lines.length > 0) {
        (await this.invokeSnap({
          method: 'xrpl_request',
          params: {
            command: 'account_lines',
            account,
            marker: res.result.marker,
          },
        })) as AccountLinesResponse;
        lines.push(...res.result.lines);
      }

      return lines.map((line) => {
        const token = {
          currency: parseCurrencyCode(line.currency),
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

  private getTransactionHashFromTxResponse(submittedTx: SubmitResponse): string {
    if (submittedTx.result.engine_result === 'tesSUCCESS') {
      return submittedTx.result.tx_json.hash!;
    } else if (submittedTx.result.engine_result) {
      throw new RepositoryError(RepositoryErrorCodes.TRANSACTION_ERROR, {
        result: submittedTx.result.engine_result,
      });
    } else {
      throw new RepositoryError(RepositoryErrorCodes.TRANSACTION_ERROR);
    }
  }

  async send({
    amount,
    destination,
    destinationTag,
  }: {
    destination: string;
    amount: XrplAmount;
    destinationTag?: string;
  }): Promise<string> {
    return await withMetamaskError(async () => {
      const { account } = await this.getWallet();

      const submittedTx = await this.invokeSnap({
        method: 'xrpl_signAndSubmit',
        params: {
          TransactionType: 'Payment',
          Account: account,
          Destination: destination,
          DestinationTag: destinationTag,
          Amount: amount,
        },
      });

      return this.getTransactionHashFromTxResponse(submittedTx);
    });
  }

  public async getStoredNetworks(): Promise<Network[]> {
    return this.invokeSnap({
      method: 'xrpl_getStoredNetworks',
      params: undefined,
    });
  }

  public async getActiveNetwork(): Promise<Network> {
    return this.invokeSnap({
      method: 'xrpl_getActiveNetwork',
      params: undefined,
    });
  }

  public async changeNetwork(chainId: number): Promise<Network> {
    return await withMetamaskError(async () => {
      return await this.invokeSnap({
        method: 'xrpl_changeNetwork',
        params: { chainId },
      });
    });
  }

  public async getAccountTransactions(account: string, marker?: unknown, limit = 25): Promise<AccountTxResponse> {
    return (await this.invokeSnap({
      method: 'xrpl_request',
      params: { command: 'account_tx', account, marker, limit },
    })) as AccountTxResponse;
  }

  public async getTransaction(hash: string) {
    return this.invokeSnap({
      method: 'xrpl_request',
      params: { command: 'tx', transaction: hash },
    });
  }

  async exportPrivateKey(): Promise<void> {
    await withMetamaskError(async () =>
      this.invokeSnap({
        method: 'xrpl_extractPrivateKey',
        params: undefined,
      }),
    );
  }

  public async invokeSnap<Method extends HandlerMethod>({
    method,
    params,
  }: {
    method: Method;
    params: HandlerParams<Method>;
  }): Promise<HandlerReturns<Method>> {
    return this.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: config.snapOrigin,
        request: {
          method,
          params,
        },
      },
    }) as HandlerReturns<Method>;
  }

  private async getProvider() {
    if (typeof window === 'undefined') {
      return null;
    }

    if (await this.hasSnapsSupport()) {
      return window.ethereum;
    }

    if (window.ethereum?.detected) {
      for (const provider of window.ethereum.detected) {
        if (await this.hasSnapsSupport(provider)) {
          return provider;
        }
      }
    }

    if (window.ethereum?.providers) {
      for (const provider of window.ethereum.providers) {
        if (await this.hasSnapsSupport(provider)) {
          return provider;
        }
      }
    }

    const eip6963Provider = await this.getMetaMaskEIP6963Provider();

    if (eip6963Provider && (await this.hasSnapsSupport(eip6963Provider))) {
      return eip6963Provider;
    }

    return null;
  }

  private async hasSnapsSupport(provider: MetaMaskInpageProvider = window.ethereum): Promise<boolean> {
    try {
      await provider.request({
        method: 'wallet_getSnaps',
      });
      return true;
    } catch {
      return false;
    }
  }

  private async getMetaMaskEIP6963Provider() {
    return new Promise<MetaMaskInpageProvider | null>((rawResolve) => {
      // Timeout looking for providers after 500ms
      const timeout = setTimeout(() => {
        resolve(null);
      }, 500);

      /**
       * Resolve the promise with a MetaMask provider and clean up.
       *
       * @param provider - A MetaMask provider if found, otherwise null.
       */
      function resolve(provider: MetaMaskInpageProvider | null) {
        window.removeEventListener('eip6963:announceProvider', onAnnounceProvider);
        clearTimeout(timeout);
        rawResolve(provider);
      }

      /**
       * Listener for the EIP6963 announceProvider event.
       *
       * Resolves the promise if a MetaMask provider is found.
       *
       * @param event - The EIP6963 announceProvider event.
       * @param event.detail - The details of the EIP6963 announceProvider event.
       */
      function onAnnounceProvider({ detail }: EIP6963AnnounceProviderEvent) {
        const { info, provider } = detail;

        if (info.rdns.includes('io.metamask')) {
          resolve(provider);
        }
      }

      window.addEventListener('eip6963:announceProvider', onAnnounceProvider);

      window.dispatchEvent(new Event('eip6963:requestProvider'));
    });
  }

  private async request({ method, params }: RequestArguments) {
    if (!this.provider) {
      throw new RepositoryError(MetamaskErrorCodes.PROVIDER_NOT_INITIALIZED);
    }
    return this.provider.request({ method, params });
  }
}
