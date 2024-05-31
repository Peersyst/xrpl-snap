import { Link } from 'gatsby';
import BasePage from 'ui/common/components/layout/BasePage/BasePage';

const NotFoundPage = () => (
  <BasePage>
    <h1>Page Not Found</h1>
    <Link to="/">Go back</Link>
  </BasePage>
);

export default NotFoundPage;
