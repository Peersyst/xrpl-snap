import clsx from 'clsx';
import { LockIcon } from 'ui/common/icons';

import { IconCardRoot } from './IconCard.styles';

export interface IconCardProps {
  className?: string;
  style?: React.CSSProperties;
  Icon: typeof LockIcon;
}

function IconCard({ className, Icon, ...rest }: IconCardProps) {
  return (
    <IconCardRoot className={clsx('', className)} {...rest}>
      <Icon />
    </IconCardRoot>
  );
}

export default IconCard;
