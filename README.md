# Jest Module Mocking

How to mock modules in Jest (and bypass dependency parameters)

## Quick tour

- [`src/service.js`](src/service.js): A pretend function to call an external service
- [`src/logger.js`](src/logger.js): A logging utility

## Dependency parameter

A dependency parameter is a pattern of passing a function's dependencies as a parameter to that function.

These are often the last parameter for any given function, are identified with an underscore `_`, and are assigned a default value with a generator function like `_getDependencies()`. This pattern allows us to mock any dependency within our testing environment to make assertions based on different branches.

You can look at an example [action](src/action-dp.js) and [test file](src/action-dp.test.js).

This pattern works, and there is no reason why you need to refactor any code that uses dependency parameters. That said, there are some drawbacks to a dependency parameter:

1. Boilerplate: Setting up the dependency parameter and dependency generator function takes time and increases the lines of code for any function.
2. Ordered parameters: Maintaining the order of arguments/parameters can be tricky, especially as the list grows, and you want to make sure that your dependency parameter is never overridden unintentionally.
3. Incompatible with callback: Any function with a dependency parameter cannot plug-and-play with a callback system because there is a conflict between the "last parameter".

There are workarounds for numbers 2 and three, but overall I believe the cons outweigh the pros. So how can we get the benefit of dependency parameters without the drawbacks?

## Module mocking

Jest provides utilities for mocking imported modules within a given test.

You can look at an example [action](src/action-mm.js) and [test file](src/action-mm.test.js).

When you import a module into your test file and pass the name to `jest.mock()`, Jest creates a mocked interface for that module. Every exported function is available to you as a mock within the scope of that test.

This provides the same benefits as a dependency parameter, while reducing the amount of code within the module. By imposing no opinion to parameters for the sake of testing, function are free to interface with whatever architecture without workarounds.

## Demo

Convert demo [action](src/action-demo.js) and [test file](src/action-demo.test.js) to use module mocks.

## Conclusion

To reiterate: dependency parameters work, and there is no reason why you need to refactor any code that uses it. But when writing new tests or refactoring old components, consider mocking modules instead.
