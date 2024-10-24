import { signal, WritableSignal } from '@angular/core';
import {
  ConstructorWithArgs,
  EntityFactoryService,
} from '@core/services/entity-factory.service';

export class EntitiesDataService<TClassType, TClassArgs extends unknown[]> {
  private _entities: WritableSignal<TClassType[]> = signal([]);
  public set entities(value: TClassType[]) {
    this._entities.set(value);
  }
  public get entities(): TClassType[] {
    return this._entities();
  }
  public get entitiesSignal(): WritableSignal<TClassType[]> {
    return this._entities;
  }

  public getEntityByIndex(index: number): TClassType {
    return this.entities[index];
  }

  protected generateEntities(
    model: ConstructorWithArgs<TClassType, TClassArgs>,
    args: TClassArgs,
    quantity: number
  ): TClassType[] {
    const entities: TClassType[] = EntityFactoryService.createEntities<
      TClassType,
      TClassArgs
    >(model, args, quantity);

    this._entities.set(entities);
    return entities;
  }
}
