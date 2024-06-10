import MethodMock from "./MethodMock";
import Mock, { ExtendedMock, MockMethods } from "./Mock";

export default function <I extends object = any>(
    methods: MockMethods<keyof I>,
): {
    new (customMethods?: Partial<MockMethods<keyof I>>): ExtendedMock<keyof I, jest.Mock>;
} {
    const mock = class extends Mock {
        constructor(customMethods: Partial<MockMethods<keyof I>> = {}) {
            super();
            for (const [key, method] of Object.entries(methods)) {
                const usedMethod = customMethods?.[key as keyof I] || (method as MethodMock);
                (this as any)[key] = jest.fn()[usedMethod.type](usedMethod.value);
            }
        }
    };

    return mock as { new (customMethods?: Partial<MockMethods<keyof I>>): ExtendedMock<keyof I, jest.Mock> };
}
