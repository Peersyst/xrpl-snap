# Architecture

As introduced earlier the architecture of our frontend projects consists on four layers: UI, Domain, Data Access and Data.

In this chapter we'll go though the UI, Domain and Data Access layers and see which objects are located in each layer and how that's translated into folders.

- [UI](#ui)
- [Domain](#domain)
- [Data Access](#data-access)

Before that, it is important to know some relevant information:

Every layer is divided into modules for better organization. Here are some examples:

- **Common**: Module that contains files used across all other modules
- **Nft**: Module that contains files related with NFTs
- **Config**: Module that contains files related with configuration

On the other hand, to preserve the _Dependency Inversion Principle_ introduced on the _SOLID Principles_, every layer has an **Adapter** module that connects a layer with the layer bellow. That module is mainly formed by the following:

- **Factory**: Class that creates and injects the dependencies of objects belonging to the foreign layer. The creation of objects is performed lazily to improve performance.
- **Interfaces**: Abstractions that the local layer will depend on
- **State (UI)**: The UI layer will also have objects that enable the layer to read the state of the Domain layer. In this case these objects will be hooks as we will be working with React. More information about State can be found on the following sections

## UI

The UI layer is highly conditioned by React and is optimized for that. If we were to change framework, which is highly unlikely, we would have to rethink this layer.

The following objects will reside in the UI layer:

- **Component**: Typical React functional components. If you take a look at the base-project, you can find a _Counter_ component
- **Containers**: Special functional components that know about business logic and act as a container for normal components. In the base project there's a _StoreCounter_ container that interacts with the domain (through an adapter) and passes the information to the _Counter_ component.
- **Pages**: Group of components to form a page. May have some layout styles, contain some logic regarding the url, etc
- **Hooks**: React hooks
- **Queries**: Special hooks from the react query library.
- **Router**: Objects related with routing
- **Locale**: Objects related with localization
- **Others**: Utils, assets, errors, etc

## Domain

The domain layer contains de following objects:

- **Controllers**: Classes that perform all the domain logic of the frontend application
- **State**: Application state that other objects can subscribe to. In our case we will be using zustand for that
- **Others**: Utils, errors, etc

## Data Access

The data access layer contains de following objects:

- **Api**: Classes that perform actions against the API of the project
- **Repository**: Classes that interact with a local data source. For example: the local storage of the browser, or the secure storage of a phone.
- **Others**: Utils, errors, etc
