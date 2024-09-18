import { RowProps } from '@peersyst/react-components';
import clsx from 'clsx';

import { BaseCardListItemRoot } from './BaseCardListItem.styles';

export interface BaseCardListItemProps extends RowProps {}

function BaseCardListItem({ className, ...rest }: BaseCardListItemProps) {
  return <BaseCardListItemRoot className={clsx('BaseCardListItem', className)} {...rest} />;
}

export default BaseCardListItem;
