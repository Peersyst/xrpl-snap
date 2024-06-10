import type { JSXElementConstructor } from 'react';

export type GroupProps<P> = {
  Component: JSXElementConstructor<P>;
  count: number;
} & Omit<P, 'key' | 'Component' | 'count'>;
