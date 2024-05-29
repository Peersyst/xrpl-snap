export type MethodFactory<D extends (...args: any[]) => any> = (
  method: (...args: any[]) => any,
  target: any,
  key: string | symbol,
  descriptor: PropertyDescriptor,
) => D;

export default function createMethodDecorator<
  D extends (...args: any[]) => any,
>(factory: MethodFactory<D>) {
  return function (...decoratorArgs: Parameters<D>) {
    return function (
      target: any,
      key: string | symbol,
      descriptor: PropertyDescriptor,
    ) {
      const method = descriptor.value;

      descriptor.value = function (...args: any[]) {
        return factory(
          () => method.apply(this, args),
          target,
          key,
          descriptor,
        )(...decoratorArgs);
      };
    };
  };
}