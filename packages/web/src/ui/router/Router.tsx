import { ModalProvider } from "@peersyst/react-components";
import { BrowserRouter, Outlet, useRoutes } from "react-router-dom";
import { config } from "common/config";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { RouteObject } from "react-router-dom";
import HomePage from "ui/common/pages/HomePage/HomePage";
import CardPage from "ui/common/pages/CardPage/CardPage";

export enum MainRoutes {
    MAIN = "/",
}

export const useHomeRoutes = (): RouteObject[] => {
    return [
        {
            element: (
                <CardPage>
                    <Outlet />
                </CardPage>
            ),
            path: MainRoutes.MAIN,
            children: [
                {
                    path: MainRoutes.MAIN,
                    element: <HomePage />,
                },
            ],
        },
    ];
};

const Routes = () => {
    const dashboardRoutes = useHomeRoutes();

    return useRoutes([...dashboardRoutes]);
};

const Router = (): JSX.Element => {
    return (
        <BrowserRouter basename={config.publicUrl}>
            <ModalProvider>
                <ScrollToTop />
                <Routes />
            </ModalProvider>
        </BrowserRouter>
    );
};

export default Router;
