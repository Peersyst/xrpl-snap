import { InfiniteScroll } from '@peersyst/react-components';

import List from '../List/List';
import type { InfiniteListProps } from './InfiniteList.types';

export function InfiniteList<T>({
  data,
  isLoading = false,
  numberOfSkeletons,
  Skeleton,
  end = false,
  nothingToShow,
  renderItem,
  onEndReached,
  className,
  style,
  gap,
  ...rest
}: InfiniteListProps<T>) {
  const hasItems = isLoading || (data?.length ?? 0) > 0;

  return (
    <InfiniteScroll observerOffset="0" end={!hasItems || end} loading={isLoading} callback={onEndReached} {...rest}>
      <List
        data={data}
        isLoading={isLoading}
        numberOfSkeletons={numberOfSkeletons}
        Skeleton={Skeleton}
        nothingToShow={nothingToShow}
        renderItem={renderItem}
        className={className}
        gap={gap}
      />
    </InfiniteScroll>
  );
}
