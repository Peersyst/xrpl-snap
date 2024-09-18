import { delay } from './delay';

export async function withRetries<T>(
  fn: () => T,
  maxRetries: number,
  timeout: number,
  onRetry?: (error: any) => void,
): Promise<Awaited<T>> {
  let retries = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await Promise.resolve(fn());
    } catch (error) {
      if (retries >= maxRetries) {
        throw error;
      }
      onRetry?.(error);
      retries += 1;
      await delay(timeout);
    }
  }
}
