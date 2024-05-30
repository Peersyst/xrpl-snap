import { Token } from 'common/models/token';

export type TokenProps = {
  token: Token;
  balance: string;
  loading?: boolean;
  className?: string;
};
