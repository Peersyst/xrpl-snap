import type { TextFieldProps } from '@peersyst/react-components';
import { TextField } from '@peersyst/react-components';
import clsx from 'clsx';

export type XrplAddressTextFieldProps = {} & TextFieldProps;

function XrplAddressTextField({ className, ...rest }: XrplAddressTextFieldProps) {
  return <TextField validators={{ xrplAddress: true }} className={clsx('XrplAddressTextField', className)} {...rest} />;
}

export default XrplAddressTextField;
