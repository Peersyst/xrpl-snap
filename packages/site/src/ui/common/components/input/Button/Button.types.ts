import type { ButtonProps as BaseButtonProps } from '@peersyst/react-components';

export type ButtonProps = {
  /**
   * Set to true if you want the button to be rounded
   */
  rounded?: boolean;
} & Omit<BaseButtonProps, 'size'>;
