import { SkeletonProps } from "@peersyst/react-components";
import { ReactElement, ReactNode } from "react";
import { GroupProps } from "./Group/Group.types";

export interface SkeletonsProps extends Omit<SkeletonProps, "loading"> {
    count: number;
}

export type DataLoaderProps = {
    nothingToShow?: ReactNode;
    Skeleton?: GroupProps<SkeletonProps>["Component"];
    isLoading?: boolean;
    numberOfSkeletons?: number;
};

export interface ListProps<T> extends DataLoaderProps {
    gap?: number | string;
    className?: string;
    style?: React.CSSProperties;
    renderItem?: (data: T, index: number) => ReactElement;
    data?: T[];
    header?: ReactNode;
}
