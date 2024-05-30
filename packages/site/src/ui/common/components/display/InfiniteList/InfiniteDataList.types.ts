import { InfiniteScrollProps as BaseInfiniteScrollProps } from "@peersyst/react-components";
import { DataLoaderProps, ListProps } from "../List/List.types";

export interface EnhancedInfiniteScrollProps
    extends Omit<BaseInfiniteScrollProps, "callback" | "children" | "loading" | "end" | "loaderElement"> {
    onEndReached: BaseInfiniteScrollProps["callback"];
    end?: BaseInfiniteScrollProps["end"];
}

export interface InfiniteScrollDataProps<T> extends EnhancedInfiniteScrollProps, DataLoaderProps, ListProps<T> {}
