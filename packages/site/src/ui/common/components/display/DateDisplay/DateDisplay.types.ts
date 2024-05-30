import { TypographyProps } from "@peersyst/react-components";
import { DateFormat } from "./hooks/formatDate.types";

export type DateType = Date | string | number;
export interface DateDisplayProps extends Omit<TypographyProps, "children" | "numberOfLines"> {
    date: DateType;
    format?: DateFormat;
}
