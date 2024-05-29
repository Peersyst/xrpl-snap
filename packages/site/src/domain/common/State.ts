interface State<T> {
    getState: () => T;
    setState: (value: T | Partial<T> | ((prevState: T) => T | Partial<T>)) => void;
    subscribe: (listener: (state: T, prevState: T) => void) => () => void;
}

export type PublicState<T> = Omit<State<T>, "setState">;

export type ControllerWithState<T extends Record<string, any>> = {
    [Key in `${Exclude<keyof T, symbol>}State`]: PublicState<Key extends `${infer K}State` ? T[K] : never>;
};

export default State;
