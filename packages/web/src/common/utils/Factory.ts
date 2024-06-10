export type IFactory<T extends Record<string, any>> = T & {
    init: () => Promise<void>;
};

export default function Factory<T extends Record<string, any>>(modules: Record<keyof T, (resolve: T) => T[keyof T]>): IFactory<T> {
    const resolutions = {} as T;

    const resolve = new Proxy(
        {},
        {
            get: (_target, key: string) => {
                if (resolutions[key]) {
                    return resolutions[key];
                }
                resolutions[key as keyof T] = modules[key](resolve);
                return resolutions[key];
            },
        },
    ) as unknown as T;

    for (const module of Object.keys(modules)) {
        if (resolutions[module]) {
            continue;
        }
        resolutions[module as keyof T] = modules[module](resolve);
    }

    const init = async () => {
        await Promise.all(
            Object.values(resolutions).map(async (resolution) => {
                if (resolution.onInit) {
                    return Promise.resolve(resolution.onInit());
                }
            }),
        );
    };

    return { ...resolutions, init };
}
