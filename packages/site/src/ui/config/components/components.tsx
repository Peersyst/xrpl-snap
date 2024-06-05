import { CreateConfig } from '@peersyst/react-components';

const components: CreateConfig['components'] = {
  Button: {
    defaultProps: {
      variant: 'primary',
      size: 'lg',
    },
  },
  Chip: {
    defaultProps: {
      variant: 'outlined',
      rounded: true,
      size: 'md',
    },
  },
  Popover: {
    defaultProps: {
      arrow: true,
      position: 'top',
    },
  },
  Toast: {
    defaultProps: {
      position: 'bottom-right',
    },
  },
  Skeleton: {
    defaultProps: {
      animation: 'pulse',
    },
  },
  TextInput: {
    defaultProps: {
      errorElement: false,
    },
  },
  BlockchainAddress: {
    blockchainLinks: {
      mainnetAddress: 'https://livenet.xrpl.org/accounts/',
      testnetAddress: 'https://testnet.xrpl.org/accounts/',
      testnetTx: 'https://testnet.xrpl.org/transactions/',
      mainnetTx: 'https://livenet.xrpl.org/transactions/',
    },
  },
};

export default components;
