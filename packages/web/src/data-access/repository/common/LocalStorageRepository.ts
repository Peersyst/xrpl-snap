import Repository from "./Repository";

export default class LocalStorageRepository<T> extends Repository<T> {
    protected set(value: T): Promise<void> {
        return Promise.resolve(localStorage.setItem(this.storageKey, JSON.stringify(value)));
    }

    protected get(): Promise<T | undefined> {
        const item = localStorage.getItem(this.storageKey);
        return Promise.resolve(item ? JSON.parse(item) : undefined);
    }

    protected clear(): Promise<void> {
        return Promise.resolve(localStorage.removeItem(this.storageKey));
    }
}
