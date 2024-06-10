import '@peersyst/react-components';

declare module '@peersyst/react-components' {
  export type ButtonVariantOverrides = {
    filled: false;
    outlined: false;
    text: true;
    primary: true;
    secondary: true;
  };

  export type ButtonSizeOverrides = {
    sm: false;
    md: false;
    lg: true;
  };
}
