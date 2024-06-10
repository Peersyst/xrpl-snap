# Testing

In the last place, we test our code with unit tests using jest. In this chapter you'll find:

- [Structure](#structure)
- [Mocks](#mocks)
- [Testing UI](#testing-ui)
- [Testing Domain and Data Access](#testing-domain-and-data-access)

## Structure

The structure consists on the following:

- **\_\_mocks\_\_**: Contains common mocks
- **ui**: Contains UI tests
- **domain**: Contains Domain tests
- **data-access**: Contains Data Access tests
- **utils**: Contains common utils

As you can see, there is on folder for each layer in the application. In each layer we can find the following files and folders:

- **\_\_mocks\_\_**: Layer mocks
- **utils**: Layer utils
- **jest.config.ts**: jest config of the layer
- **setup.ts**: Setup file of the layer
- **{{module}}**: A folder for each module containing its tests (.spec.(ts|tsx) files) replicating the same structure as the `src` folder

## Mocks

Mocks are created to simulate other objects and isolate tests.

We use two types of mocks in our projects:

- [Local mocks](#local-mocks)
- [Global mocks](#plain-mocks)

### Local mocks

Local mocks are objects with dummy attributes and functions. For example:

```ts
class UserDtoMock {
  id: string;
  name: string;

  constructor({ id = '1', name = 'Carlos' }: Partial<UserDto> = {}) {
    this.id = id;
    this.name = name;
  }
}
```

On the other hand, if the mock has methods or returns function, we can use the `createMock` utility:

```ts
import { ICounterRepository } from 'domain/adapter/repositories/CounterRepository.interface';
import createMock from '../../utils/createMock';
import MethodMock from '../../utils/MethodMock';

export default createMock<ICounterRepository>({
  getCount: new MethodMock('mockResolvedValue', 0),
  setCount: new MethodMock('mockResolvedValue'),
});
```

### Global mocks

Global mocks override the behavior of an object globally and can be created with the `createGlobalMock` utility.

```ts
import LocalStorageRepository from 'data-access/repository/common/LocalStorageRepository';
import createGlobalMock from '../../utils/createGlobalMock';
import MethodMock from '../../utils/MethodMock';

export default createGlobalMock(LocalStorageRepository.prototype, {
  get: new MethodMock('mockResolvedValue', 'test'),
  set: new MethodMock('mockResolvedValue'),
});
```

It is very important to clear mocks inside a `beforeEach` to avoid corrupted data across tests.

```ts
describe('CounterController', () => {
  let counterController: CounterController;

  const counterStateMock = new CounterStateMock();
  const counterRepositoryMock = new CounterRepositoryMock();

  beforeEach(() => {
    counterController = new CounterController(counterStateMock, counterRepositoryMock);

    counterStateMock.clearMocks();
    counterRepositoryMock.clearMocks();
  });
});
```

## Testing UI

To test the UI we use `@testing-library/react` and have a set of utilities at `test/ui/utils/test-utils`.

Knowing that, testing a component is quite easy, as you can see in the `Counter.spec.tsx` test. We just have to use the render function from `test-utils`, the screen object from `@testing-library/react` and maybe som other utils like `userEvent` from `@testing-library/user-event`.

```ts
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from 'ui/dashboard/components/display/Counter';
import { render } from '../../../utils/test-utils';

describe('Counter', () => {
  test('Render', () => {
    render(<Counter value={0} onIncrement={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Increment counter' })).toBeInTheDocument();
    expect(screen.getByText('Value: 0')).toBeInTheDocument();
  });

  test('Increment counter', async () => {
    const user = userEvent.setup();

    const handleIncrement = jest.fn();

    render(<Counter value={0} onIncrement={handleIncrement} />);

    await user.click(screen.getByRole('button', { name: 'Increment counter' }));
    expect(handleIncrement).toHaveBeenCalledTimes(1);
  });
});
```

On the other hand, hooks can be tested using the `renderHook` function from `test-utils`. Here is an example of the useCustomInfiniteQuery hook test:

```ts
import { waitFor } from '@testing-library/dom';
import { PaginatedData, useInfiniteQuery } from 'ui/query/react-query-overrides';
import { renderHook } from '../utils/test-utils';

type PaginatedTestItems = PaginatedData<number[]>;
const getNumbers = ({ pageParam = 0 }): Promise<PaginatedTestItems> =>
  new Promise((resolve) => resolve({ items: [1, 2, 3, 4, 5], pages: 5, currentPage: pageParam }));
const getLastNumbers = (): Promise<PaginatedTestItems> =>
  new Promise((resolve) => resolve({ items: [1, 2, 3, 4, 5], pages: 5, currentPage: 5 }));

describe('useCustomInfiniteQuery test', () => {
  test('hasNextPage is true when currentPage < pages', async () => {
    const { result } = renderHook(() => useInfiniteQuery('test', getNumbers));

    await waitFor(() => expect(result.current.hasNextPage).toBe(true));
  });

  test('hasNextPage is false when currentPage < pages', async () => {
    const { result } = renderHook(() => useInfiniteQuery('test', getLastNumbers));

    await waitFor(() => expect(result.current.hasNextPage).toBe(false));
  });
});
```

## Testing Domain and Data Access

Finally, testing Domain and Data Access code is pure jest. Here's the `CounterController.spec.ts`:

```ts
import CounterController from 'domain/counter/controllers/CounterController';
import DomainErrorCodes from 'domain/error/DomainErrorCodes';
import CounterStateMock from '../../__mocks__/counterState.mock';
import CounterRepositoryMock from '../../__mocks__/CounterRepository.mock';

describe('CounterController', () => {
  let counterController: CounterController;

  const counterStateMock = new CounterStateMock();
  const counterRepositoryMock = new CounterRepositoryMock();

  beforeEach(() => {
    counterController = new CounterController(counterStateMock, counterRepositoryMock);

    counterStateMock.clearMocks();
    counterRepositoryMock.clearMocks();
  });

  describe('loadCount', () => {
    test('Should load count if stored', async () => {
      counterRepositoryMock.getCount.mockResolvedValueOnce(1);

      await counterController.loadCount();

      expect(counterStateMock.setState).toHaveBeenCalledWith(1);
    });

    test('Should not load count if not stored', async () => {
      counterRepositoryMock.getCount.mockResolvedValueOnce(undefined);

      await counterController.loadCount();

      expect(counterStateMock.setState).not.toHaveBeenCalled();
    });
  });

  describe('increment', () => {
    test('Should increment state', async () => {
      counterStateMock.getState.mockReturnValueOnce(0);

      await counterController.increment();

      expect(counterStateMock.setState).toHaveBeenCalledWith(1);
    });

    test('Throws MAX_COUNT_REACHED when count is MAX_SAFE_INTEGER', async () => {
      counterStateMock.getState.mockReturnValueOnce(Number.MAX_SAFE_INTEGER);

      await expect(counterController.increment()).rejects.toThrowError(DomainErrorCodes.MAX_COUNT_REACHED);
    });
  });
});
```
