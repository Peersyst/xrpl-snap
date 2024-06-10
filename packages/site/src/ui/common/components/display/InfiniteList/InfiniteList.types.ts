import type { PaginatedData } from 'ui/query/react-query-overrides';

import type { ListProps } from '../List/List.types';
import type { InfiniteScrollDataProps } from './InfiniteDataList.types';

export type OmittedDataListProps<T> = Pick<ListProps<PaginatedData<T[]>>, 'className' | 'style' | 'gap'>;

export type InfiniteListProps<T> = {} & OmittedDataListProps<T> & InfiniteScrollDataProps<T>;
