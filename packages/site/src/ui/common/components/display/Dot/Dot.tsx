import clsx from 'clsx';
import styled from 'styled-components';

export interface DotProps {
  className?: string;
  style?: React.CSSProperties;
  size?: string;
}
const DootRoot = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.green,
  borderRadius: '50%',
}));

function Dot({ className, size = '0.5rem', ...rest }: DotProps) {
  return (
    <DootRoot
      css={{ width: size, height: size }}
      className={clsx('Dot', className)}
      {...rest}
    />
  );
}

export default Dot;
