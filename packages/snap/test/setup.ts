jest.mock('@xrpl-snap/ripple-binary-codec', () => ({
  __esModule: true,
  ...jest.requireActual('@xrpl-snap/ripple-binary-codec'),
}));

jest.mock('ripple-keypairs', () => ({
  __esModule: true,
  ...jest.requireActual('ripple-keypairs'),
}));

jest.mock('xrpl', () => ({
  __esModule: true,
  ...jest.requireActual('xrpl'),
}));

jest.mock('@metamask/key-tree', () => ({
  __esModule: true,
  ...jest.requireActual('@metamask/key-tree'),
}));

(globalThis as any).snap = {
  request: jest.fn(),
};
