// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import "common/polyfills";

// matchmedia mock
import { LightMatchMediaMock } from "./mocks/MatchMedia.mock";
import { IntersectionObserverMock } from "./mocks/IntersectionObserver.mock";
import { ResizeObserverMock } from "./mocks/ResizeObserver.mock";

jest.mock("@peersyst/react-components", () => ({
    __esModule: true,
    ...jest.requireActual("@peersyst/react-components"),
}));

jest.mock("react-router-dom", () => ({
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
}));

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(LightMatchMediaMock),
});

window.IntersectionObserver = jest.fn().mockImplementation(IntersectionObserverMock);
window.ResizeObserver = jest.fn().mockImplementation(ResizeObserverMock);
