import { ThemeColor, useColor } from "@peersyst/react-components";
import clsx from "clsx";
import styled from "styled-components";

export interface DotProps {
    className?: string;
    style?: React.CSSProperties;
    size?: string;
    color?: ThemeColor;
}
const DootRoot = styled.div(() => ({
    borderRadius: "50%",
}));

function Dot({ className, color: colorProp = "green", size = "0.5rem", ...rest }: DotProps) {
    const color = useColor(colorProp);
    return <DootRoot css={{ width: size, height: size, backgroundColor: color }} className={clsx("Dot", className)} {...rest} />;
}

export default Dot;
