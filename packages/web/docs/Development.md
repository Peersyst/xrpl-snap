# Development

In this section you'll see a brief introduction to the development of the main different object types.

* [Development of UI](#development-of-ui)
* [Development of Domain](#development-of-domain)
* [Development of Data Access](#development-of-data-access)

For that, we'll use the counter example found in the base project.

## Development of UI

* [Development of the UI Adapter](#development-of-the-ui-adapter)
* [Development of a Component](#development-of-a-component)
* [Development of a Container](#development-of-a-container)
* [Development of a Page](#development-of-a-page)

### Development of the UI Adapter

First of all, we have to add the interfaces that the UI will consume. In this case, these interfaces will belong to Domain controllers. Because of that we'll create a file `ui/adapter/controller/ICounterController.ts` with an *IControllerInterface*.

```ts
export interface ICounterController {
    loadCount(): Promise<void>;
    increment(): Promise<void>;
}
```

After that, we can add the controller to the ControllerFactory in order to create it and provide it to the UI. This is done in `ui/adapter/ControllerFactory.ts` following the next steps:

1. Add a private static variable called `_{name}Controller` with the interface created as the type
2. Add the corresponding getter called `{name}Controller`. For this, you can use the `resolve` method inherited from `Factory`
3. Add the private `_{name}Controller` variable and its factory (injecting the dependencies) in the `resolve` parameters

```ts
import Factory from "utils/Factory";
import CounterController from "domain/counter/controllers/CounterController";
import counterState from "domain/counter/state/counterState";
import RepositoryFactory from "domain/adapter/RepositoryFactory";
import { ICounterController } from "./controllers/ICounterController";

export default class ControllerFactory extends Factory {
    private static _counterController: ICounterController;

    static get counterController(): ICounterController {
        return this.resolve(this._counterController, () => new CounterController(counterState, RepositoryFactory.counterRepository));
    }
}
```

Finally, as you can see, the CounterController uses a zustand state. To access it with React and subscribe to its changes, we'll need to create a hook from the `useStore` hook provided by the library. We'll create it at `ui/adapter/state/useCounterState.ts`.

```ts
import counterState from "domain/counter/state/counterState";
import { useStore } from "zustand";

const useCounterState = () => useStore(counterState);

export default useCounterState;
```

### Development of a Component

The development of a component doesn't have much complexity added. The first thing to do is to locate the component under a specific folder in its module. That folder depends on the use of the component (input, display, layout, similar to MUI). So, in the case of the counter example, we'll build a `Counter` component under the dashboard module and it will be located at `ui/dashboard/component/display/Counter.tsx`.

This is how we do it for small components. On the other side, if the component grows and has many types and styles, we separate them in different files and place them all under a folder with the name of the component, in this case `ui/dashboard/component/display/Counter`. Here we would have three files:

* **Counter.tsx**: With the component itself
* **Counter.types.ts**: With the types of the component
* **Counter.styles.ts**: With the styles of the component (using Styled Components)

```tsx
import { Button, Col, Typography } from "@peersyst/react-components";

export interface CounterProps {
    value: number;
    onIncrement: () => void;
}

export default function Counter({ value, onIncrement }: CounterProps): JSX.Element {
    return (
        <Col flex={1} gap="2rem" alignItems="center" css={{ marginTop: "2rem" }}>
            <Button onClick={onIncrement} color="primary">
                Increment counter
            </Button>
            <Typography variant="body1" fontWeight="bold">
                Value: {value}
            </Typography>
        </Col>
    );
}
```

### Development of a Container

Next, for this use case, where we want to get the last counter value stored in the client and update it, we have to create a container that acts as a wrapper for `Counter`.This container will provide the counter value (using the `useCounterState` hook) and trigger the increment method (from the `CounterControlled` accessed through the `ControllerFactory` getter) whenever it changes.

For that, we'll create a `StoreCounter` component under `ui/dashboard/containers/StoreCounter.tsx`.

```tsx
import ControllerFactory from "ui/adapter/ControllerFactory";
import useCounterState from "ui/adapter/state/useCounterState";
import Counter from "ui/dashboard/components/display/Counter";

export default function StoreCounter(): JSX.Element {
    const counter = useCounterState();

    const handleIncrement = () => {
        ControllerFactory.counterController.increment();
    };

    return <Counter value={counter} onIncrement={handleIncrement} />;
}

```

### Development of a Page

Finally, we create the Dashboard page under `ui/dashboard/pages/DashboardPage.tsx`.

```tsx
import BasePage from "../../common/components/layout/BasePage/BasePage";
import StoreCounter from "../containers/StoreCounter/StoreCounter";

export default function DashboardPage(): JSX.Element {
    return (
        <BasePage>
            <StoreCounter />
        </BasePage>
    );
}
```

## Development of Domain

* [Development of the Domain Adapter](#development-of-the-domain-adapter)
* [Development of the State](#development-of-the-state)
* [Development of a Controller](#development-of-a-controller)

### Development of the Domain Adapter

The development of the Domain adapter is very similar to the UI's one.

We create the interfaces, in this case from the repositories used by the Domain. Those will live in `domain/adapter/repositories`.

Here's an example of the `ICounterRepository.ts`.

```ts
export interface ICounterRepository {
    getCount(): Promise<number | undefined>;
    setCount(count: number): Promise<void>;
}
```

Then, as we did in the UI layer, we add the corresponding repository to the `RepositoryFactory` at `domain/adapter/RepositoryFactory.

```ts
import Factory from "../../utils/Factory";
import CounterRepository from "../../data-access/repository/counter/CounterRepository";
import { ICounterRepository } from "./repositories/ICounterRepository";

export default class RepositoryFactory extends Factory {
    private static _counterRepository: ICounterRepository;

    static get counterRepository(): ICounterRepository {
        return this.resolve(this._counterRepository, () => new CounterRepository());
    }
}
```

### Development of the State

The development of the state is very easy as we just have to export a zustand store and its interface. Following the counter example, we'd have to create a file named `counterStore` at `domain/counter/state/counterState.ts`

```ts
import { createStore } from "zustand/vanilla";

export type ICounterState = number;

const counterState = createStore<ICounterState>(() => 0);

export default counterState;

```

### Development of a Controller

Finally the `CounterController`, that will be in charge of all the domain logic of the counter, will be located at `domain/counter/controllers/CounterController.ts`.

As you can see the dependencies are indicated using abstractions of the State and CounterRepository.

```ts
import { ICounterController } from "ui/adapter/controllers/ICounterController";
import { ICounterRepository } from "../../adapter/repositories/ICounterRepository";
import DomainError from "../../error/DomainError";
import CounterErrorCodes from "../CounterErrorCodes";
import { ICounterState } from "../state/counterState";
import State from "domain/common/State";

export default class CounterController extends ICounterController {
    constructor(private readonly counterState: State<ICounterState>, private readonly counterRepository: ICounterRepository) {}

    public async loadCount(): Promise<void> {
        const savedCount = await this.counterRepository.getCount();
        if (savedCount !== undefined) this.counterState.setState(savedCount);
    }

    public async increment(): Promise<void> {
        const count = this.counterState.getState();

        if (count === Number.MAX_SAFE_INTEGER) throw new DomainError(CounterErrorCodes.MAX_COUNT_REACHED);

        const nextCount = this.counterState.getState() + 1;
        this.counterState.setState(nextCount);
        await this.counterRepository.setCount(nextCount);
    }
}

```

## Development of Data Access

* [Development of the API Module](#development-of-the-api-module)
* [Development of a Repository](#development-of-a-repository)

### Development of the API module

The easiest module to develop is the API module, as it is generated automatically from an openapi specification.

To generate it you can just run `yarn generate:openapi`. This is executed every time the frontend starts and places the services at `data-access/api` and models at `common/models/api`.

### Development of a Repository

Finally, repositories provide methods to read and write a data source located in the client. For example, the `CounterRepository` reads the last count and updates it in the local storage using the inherited methods from `LocalStorageRepository`. To create a repository you can use the `Repository` abstract class.

Here's the code for the `CounterRepository` class located at `data-access/repository/counter/CounterRepository.ts`.

```ts
import { ICounterRepository } from "domain/adapter/repositories/ICounterRepository";
import LocalStorageRepository from "../common/LocalStorageRepository";

export default class CounterRepository extends LocalStorageRepository<number> implements ICounterRepository {
    constructor() {
        super("counter");
    }

    getCount(): Promise<number | undefined> {
        return this.get();
    }

    setCount(count: number): Promise<void> {
        return this.set(count);
    }
}
```
