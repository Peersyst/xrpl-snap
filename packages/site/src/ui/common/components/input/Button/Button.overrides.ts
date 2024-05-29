import "@peersyst/react-components";

declare module "@peersyst/react-components" {
    export interface ButtonVariantOverrides {
        filled: false;
        outlined: false;
        text: true;
        primary: true;
        secondary: true;
        tertiary: true;
    }

    export interface ButtonSizeOverrides {}
}
