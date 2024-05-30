import { Col } from '@peersyst/react-components';
import BalanceCard from '../ui/common/containers/BalanceCard/BalanceCard';
import AccountInfoModal from '../ui/common/containers/AccountInfoModal/AccountInfoModal';

function App() {
  return (
    <Col flex={1}>
      <BalanceCard />
      <AccountInfoModal />
    </Col>
  );
}

export default App;
