import type { BalanceAction } from './formatBalance';

export const ACTION_LABEL: Record<BalanceAction, string> = {
  add: '+',
  subtract: '-',
  display: '',
  round: '≈ ',
};
