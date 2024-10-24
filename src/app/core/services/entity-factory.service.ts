export type ConstructorWithArgs<T, Args extends unknown[]> = new (
  ...args: Args
) => T;

export class EntityFactoryService {
  static createEntities<TModel, TArgs extends unknown[] = []>(
    model: ConstructorWithArgs<TModel, TArgs>,
    args: TArgs,
    length: number
  ): TModel[] {
    return Array.from({ length }, () => new model(...args));
  }
}
