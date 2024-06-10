import type { SkeletonProps } from '@peersyst/react-components';
import type { ReactElement, ReactNode } from 'react';

import type { GroupProps } from './Group/Group.types';

export type SkeletonsProps = {
  count: number;
} & Omit<SkeletonProps, 'loading'>;

export type DataLoaderProps = {
  nothingToShow?: ReactNode;
  Skeleton?: GroupProps<SkeletonProps>['Component'];
  isLoading?: boolean;
  numberOfSkeletons?: number;
};

export type ListProps<T> = {
  gap?: number | string;
  className?: string;
  style?: React.CSSProperties;
  renderItem?: (data: T, index: number) => ReactElement;
  data?: T[];
  header?: ReactNode;
} & DataLoaderProps;
