import { Col } from '@peersyst/react-components';
import BalanceCard from '../ui/wallet/container/BalanceCard/BalanceCard';
import AccountDetailsModal from '../ui/common/containers/AccountDetailsModal/AccountDetailsModal';
import ConnectSnapModal from '../ui/common/containers/ConnectSnapModal/ConnectSnapModal';
import AccountInfoModal from '../ui/common/containers/AccountInfoModal/AccountInfoModal';

function App() {
  return (
    <Col flex={1}>
      <BalanceCard />
      <AccountDetailsModal address={'raQwCVAJVqjrVm1Nj5SFRcX8i22BhdC9WA'} />
      <ConnectSnapModal />
      <AccountInfoModal />
    </Col>
  );
}

export default App;
