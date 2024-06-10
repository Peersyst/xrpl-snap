import { Fragment, PropsWithChildren } from "react";
import { ToastProvider } from "@peersyst/react-components";
import QueryClientProvider from "./query/QueryClientProvider";
import ErrorHandler from "./common/components/feedback/ErrorHandler/ErrorHandler";
import { ConfigProvider } from "./config";

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <Fragment>
        <ConfigProvider>
            <ToastProvider>
                <ErrorHandler>
                    <QueryClientProvider>{children}</QueryClientProvider>
                </ErrorHandler>
            </ToastProvider>
        </ConfigProvider>
    </Fragment>
);

export default Providers;
