import { Col } from '@peersyst/react-components';
import clsx from 'clsx';
import styled from 'styled-components';

export type VerticalLineProps = {
  className?: string;
  style?: React.CSSProperties;
};

const VerticalLineRoot = styled(Col)(
  ({ theme }) => `
    width: 1px;
    height: 100%;
    background-color: ${theme.palette.primary};
`,
);

function VerticalLine({ className, ...rest }: VerticalLineProps) {
  return <VerticalLineRoot className={clsx('VerticalLine', className)} {...rest} />;
}

export default VerticalLine;
