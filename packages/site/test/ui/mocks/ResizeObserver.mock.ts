export const ResizeObserverMock = (): { observe: () => unknown; unobserve: () => void; disconnect: () => void } => ({
    observe: () => null,
    unobserve: () => undefined,
    disconnect: () => undefined,
});
