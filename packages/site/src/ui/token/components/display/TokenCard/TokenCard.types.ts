import type { Token } from 'common/models/token';

export type TokenCardProps = {
  token: Token;
  balance: string;
  loading?: boolean;
  className?: string;
};
