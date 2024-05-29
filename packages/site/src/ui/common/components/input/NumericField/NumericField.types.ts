import type { TextFieldProps } from '@peersyst/react-components';

export type NumericFieldProps = Omit<TextFieldProps, 'format' | 'parse'> & {
  maxDecimals?: number;
};
