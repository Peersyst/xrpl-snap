export interface ICounterController {
    loadCount(): Promise<void>;
    increment(): Promise<void>;
}
