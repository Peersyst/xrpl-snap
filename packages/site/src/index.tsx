import { Fragment, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { useLoad } from 'ui/common/hooks/useLoad';
import LoadingPage from 'ui/common/pages/LoadingPage/LoadingPage';
import Providers from 'ui/Providers';
import Router from 'ui/router/Router';
import 'ui/locale/i18n';
import 'common/polyfills';

const App = (): JSX.Element | null => {
  const loading = useLoad();

  return loading ? (
    <LoadingPage />
  ) : (
    <Fragment>
      <Suspense fallback={<LoadingPage />}>
        <Router />
      </Suspense>
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
