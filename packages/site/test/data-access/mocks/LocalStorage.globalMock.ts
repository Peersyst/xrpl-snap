import createGlobalMock from "../../utils/createGlobalMock";
import MethodMock from "../../utils/MethodMock";

export default createGlobalMock(Storage.prototype, {
    getItem: new MethodMock("mockReturnValue", "test"),
    setItem: new MethodMock("mockReturnValue"),
    removeItem: new MethodMock("mockReturnValue"),
});
