import type { TokenWithBalance } from '../token';

export type SendParams = {
  amount: string;
  destination: string;
  destinationTag?: string;
  token: TokenWithBalance;
};
