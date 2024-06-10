export const IntersectionObserverMock = (): { observe: () => unknown; disconnect: () => void } => ({
    observe: () => null,
    disconnect: () => undefined,
});
