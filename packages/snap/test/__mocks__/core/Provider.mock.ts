export class ProviderMock {
  autofill = jest.fn().mockResolvedValue({ Fee: 12, Sequence: 1 });

  request = jest.fn().mockResolvedValue({ result: {} });

  changeNode = jest.fn();
}
