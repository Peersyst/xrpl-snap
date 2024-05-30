import type {
  EIP6963AnnounceProviderEvent,
  MetaMaskInpageProvider,
  RequestArguments,
} from '@metamask/providers';

import type { GetSnapsResponse } from '../../../common/models/snap';
import type { InvokeSnapParams } from '../../../ui/snap/hooks';
import RepositoryError from '../error/RepositoryError';
import { MetamaskErrorCodes } from './MetamaskErrorCodes';

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
    await this.request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: {},
      },
    });
  }

  public async getWallet(snapId: string): Promise<{ account: string }> {
    return (await this.invokeSnap(snapId, { method: 'xrpl_getAccount' })) as Promise<{ account: string }>;
  }

  private async invokeSnap(
    snapId: string,
    { method, params }: InvokeSnapParams,
  ) {
    return this.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method,
          params,
        },
      },
    });
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
