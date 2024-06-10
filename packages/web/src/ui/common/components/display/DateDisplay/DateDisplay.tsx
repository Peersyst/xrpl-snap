import { Typography } from "@peersyst/react-components";
import { DateDisplayProps } from "./DateDisplay.types";
import { DateFormat } from "./hooks/formatDate.types";
import useFormatDate from "./hooks/useFormatDate";

const DateDisplay = ({ date, format = DateFormat.SHORT_DATE, ...typographyProps }: DateDisplayProps): JSX.Element => {
    const formatDate = useFormatDate({ format });

    return <Typography {...typographyProps}>{formatDate(date)}</Typography>;
};

export default DateDisplay;
