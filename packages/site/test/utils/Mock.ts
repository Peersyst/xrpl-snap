import MethodMock from "./MethodMock";

export interface IMock {
    clearMocks(): void;
    resetMocks(): void;
    restoreMocks(): void;
}

export type ExtendedMock<K extends string | number | symbol, T> = Record<K, T> & IMock;
export type MockMethods<K extends string | number | symbol> = Record<K, MethodMock>;

export default class Mock implements IMock {
    clearMocks(): void {
        Object.values(this).forEach((value) => {
            if ((value as any)?.mockClear) value.mockClear();
        });
    }

    resetMocks(): void {
        Object.values(this).forEach((value) => {
            if ((value as any)?.mockReset) value.mockReset();
        });
    }

    restoreMocks(): void {
        Object.values(this).forEach((value) => {
            if ((value as any)?.mockRestore) value.mockRestore();
        });
    }
}
