import { config } from 'common/config';
import { NetworkChainId } from 'common/models';

import RepositoryError from '../error/RepositoryError';
import { FundErrorCodes } from './FundErrorCodes';

export interface FundWalletOptions {
  chainId: NetworkChainId;
  destination: string;
  xrpAmount: string;
}

export class FundRepository {
  private getHostName(chainId: NetworkChainId): string {
    switch (chainId) {
      case NetworkChainId.TESTNET:
        return config.faucet.testnetUrl;
      case NetworkChainId.DEVNET:
        return config.faucet.devnetUrl;
      default:
        throw new RepositoryError(FundErrorCodes.CHAIN_NOT_SUPPORTED);
    }
  }

  async fundWallet({ chainId, destination, xrpAmount }: FundWalletOptions): Promise<string> {
    const hostname = this.getHostName(chainId);
    const response = await fetch(`https://${hostname}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination,
        xrpAmount,
        userAgent: 'xrpl-snap',
      }),
    });

    if (!(response.ok && response.headers.get('Content-Type')?.startsWith('application/json'))) {
      throw new RepositoryError(FundErrorCodes.CAN_NOT_FUND_WALLET);
    }

    const res = await response.json();

    return res.transactionHash;
  }
}
