import Amount from 'common/utils/Amount';

export interface BalanceInfo {
  total: Amount;
  expendable: Amount;
  reserve: Amount;
}
