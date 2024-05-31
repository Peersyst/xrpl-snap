import {
    InfiniteQueryObserverResult,
    UseQueryResult,
    QueryKey,
    UseQueryOptions,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";

export type QueryOptions<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
>;

export type MutationOptions<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
>;

export type MutationResult<TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown> = UseMutationResult<
    TData,
    TError,
    TVariables,
    TContext
>;

export type InfiniteQueryResult<TData = unknown, TError = unknown> = InfiniteQueryObserverResult<TData, TError>;
export type QueryResult<TData = unknown, TError = unknown> = UseQueryResult<TData, TError>;

export * from "@tanstack/react-query";
