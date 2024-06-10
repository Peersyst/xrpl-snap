import type Amount from 'common/utils/Amount';

import type { NumericFieldProps } from '../NumericField/NumericField.types';

export type AmountFieldProps = NumericFieldProps & {
  balance?: Amount;
};

export type MaxAmountTypographyProps = {
  isValidAmount: boolean;
};
