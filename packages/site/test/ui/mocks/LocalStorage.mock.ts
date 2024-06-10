export class LocalStorageMock {
    store: { [key: string]: string } = {};

    clear(): void {
        this.store = {};
    }

    getItem(key: string): string | null {
        return this.store[key] || null;
    }

    setItem(key: string, value: string): void {
        this.store[key] = value;
    }

    removeItem(key: string): void {
        delete this.store[key];
    }
}
