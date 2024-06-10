import LocalStorageRepository from "data-access/repository/common/LocalStorageRepository";
import createGlobalMock from "../../utils/createGlobalMock";
import MethodMock from "../../utils/MethodMock";

export default createGlobalMock(LocalStorageRepository.prototype, {
    get: new MethodMock("mockResolvedValue", "test"),
    set: new MethodMock("mockResolvedValue"),
    clear: new MethodMock("mockResolvedValue"),
});
