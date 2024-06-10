import { TextField, useNumericInput } from '@peersyst/react-components';

import type { NumericFieldProps } from './NumericField.types';

const NumericField = ({ maxDecimals, ...props }: NumericFieldProps) => {
  const { format, parse } = useNumericInput({ maxDecimals });

  return <TextField format={format} parse={parse} {...props} type="number" />;
};

export default NumericField;
