import { Col, Divider, Skeleton } from '@peersyst/react-components';
import clsx from 'clsx';
import { Fragment } from 'react';

import NothingToShow from '../../feedback/NothingToShow/NothingToShow';
import Group from './Group/Group';
import { ListRoot } from './List.styles';
import type { ListProps } from './List.types';

export default function List<T>({
  className,
  style,
  gap = 0,
  data,
  Skeleton: SkeletonProp = Skeleton,
  numberOfSkeletons = 3,
  renderItem,
  isLoading,
  nothingToShow,
  header,
}: ListProps<T>): JSX.Element {
  const hasItems = isLoading || (data?.length ?? 0) > 0;

  return (
    <ListRoot className={clsx('List', className)} gap={gap} style={style}>
      {hasItems ? (
        <>
          {header && (
            <Col>
              {header}
              <Divider />
            </Col>
          )}
          {data?.map((item, i) => (
            <Fragment key={i}>{renderItem?.(item, i)}</Fragment>
          ))}
          {isLoading && <Group Component={SkeletonProp} count={numberOfSkeletons} />}
        </>
      ) : (
        <>{nothingToShow ?? <NothingToShow />}</>
      )}
    </ListRoot>
  );
}
