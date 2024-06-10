export type MethodMockType = Extract<
    keyof jest.MockInstance<any, any>,
    "mockReturnValue" | "mockResolvedValue" | "mockRejectedValue" | "mockImplementation"
>;

export default class MethodMock {
    type: MethodMockType;
    value: any;

    constructor(type: MethodMockType, value: any = undefined) {
        this.type = type;
        this.value = value;
    }
}
