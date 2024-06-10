import { createMethodDecorator } from './createMethodDecorator';

/**
 * Creates a decorator that will handle errors thrown by the decorated method
 * @param handler - Function that handles the error
 */
export function createErrorHandlerDecorator<A extends any[]>(handler: (error: any, ...decoratorArgs: A) => any) {
  return createMethodDecorator((method) => {
    return function (...decoratorArgs: A) {
      try {
        const result = method();

        if (result && result instanceof Promise) {
          return result.catch((error) => handler(error, ...decoratorArgs));
        }

        return result;
      } catch (error) {
        handler(error, ...decoratorArgs);
      }
    };
  });
}
