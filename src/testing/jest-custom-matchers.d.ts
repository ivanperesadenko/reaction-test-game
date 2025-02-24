declare module 'jest' {
  interface Matchers<T> {
    withContext(context: string): T;
  }
}