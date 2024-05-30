import { Col } from '@peersyst/react-components';
import clsx from 'clsx';

export interface SideBarProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function SideBar({ className, children, ...rest }: SideBarProps) {
  return (
    <Col className={clsx('', className)} {...rest}>
      SideBar
    </Col>
  );
}

export default SideBar;
