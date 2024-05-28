import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import clsx from "clsx";

export default function AngleDownIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="AngleDownIcon" className={clsx(undefined, "Icon", className)} fill="none">
            <path
                d="M11.25 17.5192L3.40385 9.67308C2.82692 9.09615 2.82692 8.23077 3.40385 7.71154L4.67308 6.38462C5.25 5.86538 6.11538 5.86538 6.63462 6.38462L12.1731 11.9808L17.7692 6.38462C18.2885 5.86538 19.1538 5.86538 19.7308 6.38462L21 7.71154C21.5769 8.23077 21.5769 9.09615 21 9.67308L13.1538 17.5192C12.6346 18.0385 11.7692 18.0385 11.25 17.5192Z"
                fill="#9A52FF"
            />
        </SvgIcon>
    );
}
