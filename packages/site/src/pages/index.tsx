import { Typography } from '@peersyst/react-components';
import Button from '../ui/common/components/input/Button/Button';

function App() {
  return (
    <div
      style={{
        flexDirection: 'column',
        display: 'flex',
        rowGap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Typography variant="h3">Welcome to XRP Snap</Typography>
      <a href="/playground">
        <Button>Go to metamask playground</Button>
      </a>
      <a href="/snap">
        <Button>Go to snap playground</Button>
      </a>
    </div>
  );
}

export default App;
