import { Col } from '@peersyst/react-components';
import BalanceCard from '../ui/common/containers/BalanceCard/BalanceCard';
import ConnectSnapModal from '../ui/common/containers/ConnectSnapModal/ConnectSnapModal';

function App() {
  return (
    <Col flex={1}>
      <BalanceCard />
      <ConnectSnapModal />
    </Col>
  );
}

export default App;
