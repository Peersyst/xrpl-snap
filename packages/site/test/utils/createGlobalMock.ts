import MethodMock from "./MethodMock";
import Mock, { ExtendedMock, MockMethods } from "./Mock";

export default function <C extends object, K extends string>(
    obj: C,
    methods: MockMethods<K>,
): { new (customMethods?: Partial<MockMethods<K>>): ExtendedMock<K, jest.SpyInstance> } {
    const mock = class extends Mock {
        constructor(customMethods: Partial<MockMethods<K>> = {}) {
            super();
            for (const [key, method] of Object.entries(methods)) {
                const usedMethod = customMethods?.[key as K] || (method as MethodMock);
                (this as any)[key] = jest.spyOn(obj, key as any)[usedMethod.type](usedMethod.value);
            }
        }
    };

    return mock as { new (customMethods?: Partial<MockMethods<K>>): ExtendedMock<K, jest.SpyInstance> };
}
