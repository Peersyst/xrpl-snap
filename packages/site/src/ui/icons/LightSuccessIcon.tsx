import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import clsx from "clsx";

export default function LightSuccessIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="LightSuccessIcon" className={clsx(undefined, "Icon", className)} fill="none">
            <g clipPath="url(#clip0_1323_904)">
                <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    stroke="#5BEB9D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M9 12L11 14L15 10" stroke="#5BEB9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1323_904">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </SvgIcon>
    );
}
