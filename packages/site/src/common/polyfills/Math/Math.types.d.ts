import "./Math";

declare global {
    interface Math {
        min<B extends number | BigInt>(...values: B[]): B;
        max<B extends number | BigInt>(...values: B[]): B;
    }
}
