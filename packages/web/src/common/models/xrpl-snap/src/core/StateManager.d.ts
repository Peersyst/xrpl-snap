export declare type Network = {
    chainId: number;
    name: string;
    nodeUrl: string;
    explorerUrl?: string;
};
export declare type State = {
    networks: Network[];
    activeNetwork: Network;
};
export declare class StateManager {
    currentState: State | undefined;
    get(): Promise<State>;
    set(newState: Partial<State>): Promise<void>;
}
