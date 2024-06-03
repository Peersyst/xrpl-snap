import type {
  EIP6963AnnounceProviderEvent,
  MetaMaskInpageProvider,
  RequestArguments,
} from '@metamask/providers';
import { config } from 'common/config';
import type { Token, TokenWithBalance } from 'common/models/token';
import type {
  HandlerMethod,
  HandlerParams,
  HandlerReturns,
} from 'common/models/xrpl-snap/src/handler/Handler.types';
import type { AccountInfoResponse, AccountTxResponse } from 'xrpl';

import type { Network } from '../../../common/models/network/network.types';
import type { GetSnapsResponse } from '../../../common/models/snap';
import Amount from '../../../common/utils/Amount';
import RepositoryError from '../error/RepositoryError';
import { MetamaskErrorCodes } from './MetamaskErrorCodes';

export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

const XRP_TOKEN: Token = {
  currency: 'XRP',
  issuer: '',
  decimals: 6,
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
    await this.request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: {},
      },
    });
  }

  public async getWallet() {
    return this.invokeSnap({
      method: 'xrpl_getAccount',
      params: undefined,
    });
  }

  public async getTokens(account: string): Promise<TokenWithBalance[]> {
    try {
      const accountInfoResponse = (await this.invokeSnap({
        method: 'xrpl_request',
        params: { command: 'account_info', account },
      })) as AccountInfoResponse;
      const xrpBalance = accountInfoResponse.result.account_data.Balance;
      return [
        {
          ...XRP_TOKEN,
          balance: new Amount(
            xrpBalance,
            XRP_TOKEN.decimals,
            XRP_TOKEN.currency,
          ),
        },
      ];
    } catch (_) {
      return [
        {
          ...XRP_TOKEN,
          balance: new Amount('0', XRP_TOKEN.decimals, XRP_TOKEN.currency),
        },
      ];
    }
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
    return this.invokeSnap({
      method: 'xrpl_changeNetwork',
      params: { chainId },
    });
  }

  public async getAccountTransactions(
    account: string,
    marker?: unknown,
    limit = 25,
  ): Promise<AccountTxResponse> {
    return (await this.invokeSnap({
      method: 'xrpl_request',
      params: { command: 'account_tx', account, marker, limit },
    })) as AccountTxResponse;
  }

  private async invokeSnap<Method extends HandlerMethod>({
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

  private async hasSnapsSupport(
    provider: MetaMaskInpageProvider = window.ethereum,
  ): Promise<boolean> {
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
        window.removeEventListener(
          'eip6963:announceProvider',
          onAnnounceProvider,
        );
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
