import { Col, Popover, useConfig } from "@peersyst/react-components";
import clsx from "clsx";
import { Fragment, useState } from "react";
import PopoverListItem from "ui/common/components/display/Popover/PopoverListItem/PopoverListItem";
import ChipIconButton from "ui/common/components/input/ChipIconButton/ChipIconButton";
import { InfoIcon, LinkIcon, QrIcon } from "ui/common/icons";
import { useTranslate } from "ui/locale";
import ExternalLink from "ui/common/components/navigation/ExternalLink/ExternalLink";

import AccountDetailsModal from "../AccountDetailsModal/AccountDetailsModal";
import { useBlockchainAddressUrl } from "ui/network/hooks/useBlockchainAddressUrl";
import useGetAddress from "ui/wallet/hooks/useGetAddress";

export interface AccountInfoPopoverProps {
    className?: string;
    style?: React.CSSProperties;
}

function AccountInfoPopover({ className, ...rest }: AccountInfoPopoverProps) {
    const [openAccountDetails, setOpenAccountDetails] = useState(false);
    const translate = useTranslate();
    const walletAddress = useGetAddress();
    const mockedAddress = useConfig("mockedAddress");
    const address = walletAddress ?? mockedAddress;
    const url = useBlockchainAddressUrl("address", address);

    return (
        <Fragment>
            <Popover
                position="bottom-start"
                offsetY={6}
                showOn="click"
                arrow={false}
                className={clsx("AccountInfoPopover", className)}
                {...rest}
            >
                <Popover.Popper>
                    <Col>
                        <PopoverListItem Icon={QrIcon} onClick={() => setOpenAccountDetails(true)} text={translate("accountDetails")} />
                        <ExternalLink to={url} css={{ color: "unset" }}>
                            <PopoverListItem Icon={LinkIcon} text={translate("viewOnExplorer")} />
                        </ExternalLink>
                    </Col>
                </Popover.Popper>
                <Popover.Content>
                    <ChipIconButton Icon={InfoIcon} />
                </Popover.Content>
            </Popover>
            <AccountDetailsModal renderAtRoot open={openAccountDetails} onClose={() => setOpenAccountDetails(false)} />
        </Fragment>
    );
}

export default AccountInfoPopover;
