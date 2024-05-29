import type { Theme } from '@peersyst/react-components';

const typography: Partial<Theme['typography']> = {
  h1: {
    component: 'h1',
    style: {
      fontSize: '2.25rem', // 36px
      lineHeight: '3rem', // 48px
      fontWeight: 600,
    },
  },
  h2: {
    component: 'h2',
    style: {
      fontSize: '2rem', // 32px
      lineHeight: '2.5rem', // Assuming line-height should be 1.25 times the font-size
      fontWeight: 600,
    },
  },
  h3: {
    component: 'h3',
    style: {
      fontSize: '1.5rem', // 24px
      lineHeight: '2rem', // 32px
      fontWeight: 600,
    },
  },
  h4: {
    component: 'h4',
    style: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.75rem', // Assuming line-height should be 1.4 times the font-size
      fontWeight: 600,
    },
  },
  h5: {
    component: 'h5',
    style: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.5rem', // 24px
      fontWeight: 600,
    },
  },
  h6: {
    component: 'h6',
    style: {
      fontSize: '1rem', // 16px
      lineHeight: '1.375rem', // Assuming line-height should be 1.375 times the font-size
      fontWeight: 600,
    },
  },
  body1: {
    component: 'p',
    style: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1rem', // 16px
      fontWeight: 400,
    },
  },
  body2: {
    component: 'p',
    style: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1rem', // 16px
      fontWeight: 400,
    },
  },
  caption: {
    component: 'span',
    style: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1rem', // 16px
      fontWeight: 400,
    },
  },
  button: {
    component: 'span',
    style: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1rem', // 16px
      fontWeight: 500,
    },
  },
};

export default typography;
