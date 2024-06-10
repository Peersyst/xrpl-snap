import { Fragment, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Providers from "ui/Providers";
import Router from "ui/router/Router";
import { useLoad } from "ui/common/hooks/useLoad";
import "ui/locale/i18n";
import "common/polyfills";
import LoadingPage from "ui/common/pages/LoadingPage/LoadingPage";
import SnapModals from "ui/snap/containers/SnapModals/SnapModals";

const App = (): JSX.Element | null => {
    const loading = useLoad();

    return loading ? (
        <LoadingPage />
    ) : (
        <Fragment>
            <Suspense fallback={<LoadingPage />}>
                <SnapModals />
                <Router />
            </Suspense>
        </Fragment>
    );
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
    <StrictMode>
        <Providers>
            <App />
        </Providers>
    </StrictMode>,
);
