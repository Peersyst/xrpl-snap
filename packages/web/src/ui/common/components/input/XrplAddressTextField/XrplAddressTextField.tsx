import { TextField, TextFieldProps } from "@peersyst/react-components";
import clsx from "clsx";

export interface XrplAddressTextFieldProps extends TextFieldProps {}

function XrplAddressTextField({ className, ...rest }: XrplAddressTextFieldProps) {
    return <TextField validators={{ xrplAddress: true }} className={clsx("XrplAddressTextField", className)} {...rest} />;
}

export default XrplAddressTextField;
