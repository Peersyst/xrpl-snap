import { forwardRef } from "react";

const SvgMock = forwardRef(function SvgMock(props, ref) {
    return <span ref={ref} {...props} />;
});

export const ReactComponent = SvgMock;
export default SvgMock;
