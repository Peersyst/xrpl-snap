import './Math';

declare global {
  interface Math {
    min<B extends number | bigint>(...values: B[]): B;
    max<B extends number | bigint>(...values: B[]): B;
  }
}
