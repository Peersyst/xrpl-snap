export type ICounterController = {
  loadCount(): Promise<void>;
  increment(): Promise<void>;
};
