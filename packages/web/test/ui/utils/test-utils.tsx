import { JSXElementConstructor, PropsWithChildren, ReactElement } from "react";
import { render, RenderOptions, RenderResult, renderHook, RenderHookOptions, RenderHookResult } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider, QueryClientConfig } from "@tanstack/react-query";
import { ModalProvider, ToastProvider } from "@peersyst/react-components";
import { InitialEntry } from "history";
import { deepmerge } from "@peersyst/react-utils";
import { I18nextProvider } from "react-i18next";
import { ConfigProvider } from "ui/config";
import i18n from "ui/locale/i18n";

export interface CreateWrapperConfig {
    queryClientConfig?: QueryClientConfig;
}

export interface RouterConfig {
    initialEntries?: InitialEntry[];
    initialIndex?: number;
    path?: string;
}

export const createWrapper = ({ queryClientConfig }: CreateWrapperConfig = {}): JSXElementConstructor<PropsWithChildren> => {
    const queryClient = new QueryClient(
        deepmerge(
            {
                defaultOptions: {
                    queries: {
                        networkMode: "offlineFirst",
                        retry: false,
                    },
                    mutations: {
                        networkMode: "offlineFirst",
                    },
                },
                loggger: {
                    // eslint-disable-next-line no-console
                    log: console.log,
                    // eslint-disable-next-line no-console
                    warn: console.warn,
                    error: () => undefined,
                },
            },
            queryClientConfig,
        ),
    );

    return function Wrapper({ children }: PropsWithChildren): JSX.Element {
        return (
            <I18nextProvider i18n={i18n}>
                <ConfigProvider>
                    <QueryClientProvider client={queryClient}>
                        <ToastProvider>
                            <ModalProvider>{children}</ModalProvider>
                        </ToastProvider>
                    </QueryClientProvider>
                </ConfigProvider>
            </I18nextProvider>
        );
    };
};

const customRender = (
    ui: ReactElement,
    {
        queryClientConfig,
        router: { path = "/", ...memoryRouterProps } = {},
        ...rest
    }: Omit<RenderOptions, "wrapper"> & CreateWrapperConfig & { router?: RouterConfig } = {},
): RenderResult => {
    return render(
        <MemoryRouter {...memoryRouterProps}>
            <Routes>
                <Route path={path} element={ui} />
            </Routes>
        </MemoryRouter>,
        {
            wrapper: createWrapper({ queryClientConfig }),
            ...rest,
        },
    );
};

const customRenderHook = <TResult, TProps>(
    callback: (props: TProps) => TResult,
    { queryClientConfig, ...rest }: Omit<RenderHookOptions<TProps>, "wrapper"> & CreateWrapperConfig = {},
): RenderHookResult<TResult, TProps> => renderHook<TResult, TProps>(callback, { wrapper: createWrapper({ queryClientConfig }), ...rest });

const translate = i18n.t;

export * from "@testing-library/react";
export { customRender as render };
export { customRenderHook as renderHook };
export { translate };
