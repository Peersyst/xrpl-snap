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
};

export default components;
