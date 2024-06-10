import type { GroupProps } from './Group.types';

export default function Group<P>({ Component, count, ...componentProps }: GroupProps<P>): JSX.Element {
  return (
    <>
      {[...Array(count)].map((_, index) => {
        // @ts-ignore ts does not understand react's key prop
        return <Component key={index.toString()} {...componentProps} />;
      })}
    </>
  );
}
