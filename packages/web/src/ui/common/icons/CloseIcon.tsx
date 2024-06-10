import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import clsx from "clsx";

export default function CloseIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="CloseIcon" className={clsx(undefined, "Icon", className)} fill="none">
            <path d="M2.12139 23.9998L24 2.12122L21.8788 -3.19017e-05L0.000140705 21.8786L2.12139 23.9998Z" fill="white" />
            <path d="M23.9997 21.8786L2.12109 0L-0.000153972 2.12125L21.8785 23.9999L23.9997 21.8786Z" fill="white" />
        </SvgIcon>
    );
}
