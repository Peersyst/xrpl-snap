import clsx from "clsx";
import { BasePageRoot } from "./BasePage.styes";

export interface BasePageProps {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

function BasePage({ className, ...rest }: BasePageProps) {
    return <BasePageRoot className={clsx("BasePage", className)} {...rest} />;
}

export default BasePage;
