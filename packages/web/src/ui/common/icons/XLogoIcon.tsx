import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import clsx from "clsx";

export default function XLogoIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="XLogoIcon" className={clsx(undefined, "Icon", className)} fill="none">
            <path
                d="M13.9027 10.4686L21.3482 2H19.5838L13.119 9.3532L7.95547 2H2L9.8082 13.1193L2 22H3.76443L10.5915 14.2348L16.0445 22H22L13.9023 10.4686H13.9027ZM11.4861 13.2173L10.695 12.1101L4.40018 3.29968H7.11025L12.1902 10.4099L12.9813 11.5172L19.5847 20.7594H16.8746L11.4861 13.2177V13.2173Z"
                fill="white"
            />
        </SvgIcon>
    );
}
