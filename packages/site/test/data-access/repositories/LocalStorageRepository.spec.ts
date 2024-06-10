import LocalStorageRepository from "data-access/repository/common/LocalStorageRepository";
import LocalStorageGlobalMock from "../mocks/LocalStorage.globalMock";

// Expose protected methods
class PublicLocalStorageRepository<T> extends LocalStorageRepository<T> {
    get = super.get;
    set = super.set;
    clear = super.clear;

    constructor() {
        super("test");
    }
}

describe("LocalStorageRepository", () => {
    let localStorageRepository: PublicLocalStorageRepository<number>;

    const localStorageGlobalMock = new LocalStorageGlobalMock();

    beforeEach(() => {
        localStorageRepository = new PublicLocalStorageRepository<number>();

        localStorageGlobalMock.clearMocks();
    });

    describe("get", () => {
        test("Should return 1", async () => {
            localStorageGlobalMock.getItem.mockReturnValueOnce(1);
            expect(await localStorageRepository.get()).toEqual(1);
        });
    });

    describe("set", () => {
        test("Should set 1", async () => {
            await localStorageRepository.set(1);
            expect(localStorageGlobalMock.setItem).toHaveBeenCalledWith(expect.any(String), "1");
        });
    });

    describe("clear", () => {
        test("Should clear", async () => {
            await localStorageRepository.clear();
            expect(localStorageGlobalMock.removeItem).toHaveBeenCalled();
        });
    });
});
