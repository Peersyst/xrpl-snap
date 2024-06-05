import { TokenWithBalance } from '../token';

export type SendParams = {
  amount: string;
  destination: string;
  token: TokenWithBalance;
};
