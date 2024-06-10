import { InfiniteScrollDataProps } from "./InfiniteDataList.types";
import { ListProps } from "../List/List.types";
import { PaginatedData } from "ui/query/react-query-overrides";

export type OmittedDataListProps<T> = Pick<ListProps<PaginatedData<T[]>>, "className" | "style" | "gap">;

export interface InfiniteListProps<T> extends OmittedDataListProps<T>, InfiniteScrollDataProps<T> {}
