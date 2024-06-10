import { BlockchainAddress, Chip, ChipProps } from "@peersyst/react-components";
import clsx from "clsx";

export interface AccountChipProps extends Omit<ChipProps, "label"> {
    className?: string;
    style?: React.CSSProperties;
    address: string;
}

function AccountChip({ className, address, variant = "outlined", ...rest }: AccountChipProps) {
    return (
        <Chip
            label={
                <BlockchainAddress
                    address={address}
                    variant="caption"
                    //@ts-ignore TODO: fix this
                    type="account"
                    action="copy"
                    showCopyIcon
                    length={5}
                    light={variant === "filled"}
                />
            }
            className={clsx("", className)}
            variant={variant}
            {...rest}
        />
    );
}

export default AccountChip;
