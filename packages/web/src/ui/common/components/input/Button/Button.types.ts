import { ButtonProps as BaseButtonProps } from "@peersyst/react-components";

export interface ButtonProps extends Omit<BaseButtonProps, "size"> {
    /**
     * Set to true if you want the button to be rounded
     */
    rounded?: boolean;
}
