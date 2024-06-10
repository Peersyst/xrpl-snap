import type { InfiniteScrollProps as BaseInfiniteScrollProps } from '@peersyst/react-components';

import type { DataLoaderProps, ListProps } from '../List/List.types';

export type EnhancedInfiniteScrollProps = {
  onEndReached: BaseInfiniteScrollProps['callback'];
  end?: BaseInfiniteScrollProps['end'];
} & Omit<BaseInfiniteScrollProps, 'callback' | 'children' | 'loading' | 'end' | 'loaderElement'>;

export type InfiniteScrollDataProps<T> = {} & EnhancedInfiniteScrollProps & DataLoaderProps & ListProps<T>;
