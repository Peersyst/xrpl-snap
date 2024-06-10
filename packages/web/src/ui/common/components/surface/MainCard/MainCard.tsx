import { Col } from "@peersyst/react-components";
import clsx from "clsx";
import styled from "styled-components";

export interface MainCardProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const MainCardRoot = styled(Col)(({ theme }) => ({
    backgroundColor: theme.palette.background,
    borderRadius: "1rem",
    height: "43rem",
}));

function MainCard({ className, children, ...rest }: MainCardProps) {
    return (
        <MainCardRoot className={clsx("", className)} {...rest}>
            {children}
        </MainCardRoot>
    );
}

export default MainCard;
