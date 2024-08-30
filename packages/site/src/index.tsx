import { useMediaQuery } from '@peersyst/react-hooks';
import { Fragment, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { useLoad } from 'ui/common/hooks/useLoad';
import DesktopOnlyPage from 'ui/common/pages/DesktopOnlyPage/DesktopOnlyPage';
import LoadingPage from 'ui/common/pages/LoadingPage/LoadingPage';
import Providers from 'ui/Providers';
import Router from 'ui/router/Router';
import 'ui/locale/i18n';
import 'common/polyfills';

const App = (): JSX.Element | null => {
  const loading = useLoad();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return loading ? (
    <LoadingPage />
  ) : (
    <Fragment>
      {isDesktop ? (
        <Suspense fallback={<LoadingPage />}>
          <Router />
        </Suspense>
      ) : (
        <DesktopOnlyPage />
      )}
    </Fragment>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
