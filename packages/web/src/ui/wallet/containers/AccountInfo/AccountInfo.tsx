import { Col, Row, Skeleton, Typography, useConfig } from "@peersyst/react-components";
import clsx from "clsx";
import styled, { css, useTheme } from "styled-components";
import { useTranslate } from "ui/locale";
import AccountInfoPopover from "./AccountInfoPopover";
import AccountChip from "ui/wallet/components/display/AccountChip";
import useGetAddress from "ui/wallet/hooks/useGetAddress";

export interface AccountInfoProps {
    className?: string;
    style?: React.CSSProperties;
}

const AccountInfoRoot = styled(Col)(
    ({ theme }) => css`
        padding: ${theme.spacing[8]};
        row-gap: ${theme.spacing[4]};
        border-bottom: 1px solid ${theme.palette.grey[200]};
    `,
);

function AccountInfo({ className, ...rest }: AccountInfoProps) {
    const translate = useTranslate();
    const { spacing } = useTheme();
    const walletAddress = useGetAddress();
    const mockedAddress = useConfig("mockedAddress");
    const address = walletAddress ?? mockedAddress;

    return (
        <AccountInfoRoot className={clsx("AccountInfo", className)} {...rest}>
            <Typography variant="h3">{translate("account")}</Typography>
            <Row gap={spacing[2]}>
                <AccountInfoPopover />
                <Skeleton loading={!address} css={{ borderRadius: "1rem" }}>
                    <AccountChip address={address} />
                </Skeleton>
            </Row>
        </AccountInfoRoot>
    );
}

export default AccountInfo;
