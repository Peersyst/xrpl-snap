import type { EIP6963AnnounceProviderEvent, MetaMaskInpageProvider, RequestArguments } from '@metamask/providers';
import { config } from 'common/config';
import type { HandlerMethod, HandlerParams, HandlerReturns } from 'common/models/xrpl-snap/src/handler/Handler.types';
import type { Amount as XrplAmount, SubmitResponse } from 'xrpl';

import type { Network } from '../../../common/models/network/network.types';
import type { GetSnapsResponse } from '../../../common/models/snap';
import RepositoryError from '../error/RepositoryError';
import RepositoryErrorCodes from '../error/RepositoryErrorCodes';
import { MetaMaskErrorCodes } from './MetaMaskErrorCodes';
import { withMetaMaskError } from './utils/MetaMaskError';

export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export class MetaMaskRepository {
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
    await withMetaMaskError(async () => {
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

  public async getEthereumWallet(): Promise<string> {
    try {
      const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[];
      return accounts[0] || '0x0000000000000000000000000000000000000000';
    } catch (e) {
      return '0x0000000000000000000000000000000000000000';
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
    destinationTag?: number;
  }): Promise<string> {
    return await withMetaMaskError(async () => {
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

  async addToken({ issuer, currency }: { issuer: string; currency: XrplAmount; value?: number }): Promise<string> {
    return await withMetaMaskError(async () => {
      const { account } = await this.getWallet();

      const submittedTx = await this.invokeSnap({
        method: 'xrpl_signAndSubmit',
        params: {
          TransactionType: 'TrustSet',
          Account: account,
          LimitAmount: {
            currency,
            issuer,
            value: '10000000000', // MAX UINT
          },
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
    return await withMetaMaskError(async () => {
      return await this.invokeSnap({
        method: 'xrpl_changeNetwork',
        params: { chainId },
      });
    });
  }

  async exportPrivateKey(): Promise<void> {
    await withMetaMaskError(async () =>
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
      throw new RepositoryError(MetaMaskErrorCodes.PROVIDER_NOT_INITIALIZED);
    }
    return this.provider.request({ method, params });
  }
}
