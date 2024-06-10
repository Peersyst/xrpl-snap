import { Col, Divider, Popover } from "@peersyst/react-components";
import clsx from "clsx";
import { config } from "common/config";
import useSnapState from "ui/adapter/state/useSnapState";
import Dot from "ui/common/components/display/Dot/Dot";
import PopoverListItem from "ui/common/components/display/Popover/PopoverListItem/PopoverListItem";
import ExternalLink from "ui/common/components/navigation/ExternalLink/ExternalLink";
import { BurguerIcon, DoorIcon, InfoIcon } from "ui/common/icons";
import { useTranslate } from "ui/locale";
import useDisconnect from "ui/snap/queries/useDisconnect";

export interface BurguerDropdownProps {
    className?: string;
    style?: React.CSSProperties;
}

function BurguerDropdown({ className, ...rest }: BurguerDropdownProps) {
    const { isSnapInstalled } = useSnapState();
    const translate = useTranslate();
    const { mutate } = useDisconnect();
    return (
        <Popover position="bottom-start" offsetY={6} showOn="click" arrow={false} className={clsx("BurguerDropdown", className)} {...rest}>
            <Popover.Popper>
                <Col>
                    <PopoverListItem
                        prefix={<Dot size="0.75rem" color={isSnapInstalled ? "lemon" : "status.error"} />}
                        text={translate("connectedToXrpSnap")}
                    />
                    <Divider />
                    <ExternalLink to={config.snapAboutUrl} css={{ color: "unset" }}>
                        <PopoverListItem Icon={InfoIcon} text={translate("aboutThisSnap")} />
                    </ExternalLink>

                    <PopoverListItem onClick={mutate} Icon={DoorIcon} text={translate("disconnect")} />
                </Col>
            </Popover.Popper>
            <Popover.Content>
                <Col css={{ position: "relative", cursor: "pointer" }}>
                    <BurguerIcon />
                    {isSnapInstalled && (
                        <Dot
                            color="lemon"
                            size="0.5rem"
                            css={{
                                position: "absolute",
                                top: "-0.4rem",
                                right: "-0.4rem",
                                zIndex: 2,
                            }}
                        />
                    )}
                </Col>
            </Popover.Content>
        </Popover>
    );
}

export default BurguerDropdown;
