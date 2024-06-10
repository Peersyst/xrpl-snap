import "@peersyst/react-components";

declare module "@peersyst/react-components" {
    export interface ButtonVariantOverrides {
        filled: false;
        outlined: false;
        text: true;
        primary: true;
        secondary: true;
    }

    export interface ButtonSizeOverrides {
        sm: false;
        md: false;
        lg: true;
    }
}
