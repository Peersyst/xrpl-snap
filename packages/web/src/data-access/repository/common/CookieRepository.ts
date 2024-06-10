import Cookie from "../utils/Cookie";
import Repository from "./Repository";

export default class CookieRepository<T> extends Repository<T> {
    protected set(value: T): Promise<void> {
        return Promise.resolve(localStorage.setItem(this.storageKey, JSON.stringify(value)));
    }

    protected get(): Promise<T | undefined> {
        const item = Cookie.get(this.storageKey);
        return Promise.resolve(item !== undefined ? JSON.parse(`"${item}"`) : undefined);
    }

    protected clear(): Promise<void> {
        return Promise.resolve(Cookie.remove(this.storageKey));
    }
}
