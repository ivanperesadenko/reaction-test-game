import { WritableSignal } from '@angular/core';

import { EntitiesDataService } from '../../../core/services/entities-data-service/entities-data.service';
import { SQUARE_COLORS_PALETTE } from '@features/squares-game/constants/square-colors';
import {
  CustomColorfulSquare,
  CustomColorfulSquareArgs,
} from '@features/squares-game/models/square';

export class SquaresDataService extends EntitiesDataService<
  CustomColorfulSquare,
  CustomColorfulSquareArgs
> {
  private _squaresNodeList!: NodeList;

  public set squaresNodeList(squaresNodes: NodeList) {
    this._squaresNodeList = squaresNodes;
  }

  public get squaresNodeList(): NodeList {
    return this._squaresNodeList;
  }

  public getSquareDOMElementByIndex(index: number): Node {
    return this.squaresNodeList[index];
  }

  public generateSquares(quantity: number): CustomColorfulSquare[] {
    return this.generateEntities(
      CustomColorfulSquare,
      [SQUARE_COLORS_PALETTE],
      quantity
    );
  }

  public get squares(): CustomColorfulSquare[] {
    return this.entities;
  }

  public get squaresSignal(): WritableSignal<CustomColorfulSquare[]> {
    return this.entitiesSignal;
  }

  public resetSquaresState(): void {
    this.squares.forEach((square: CustomColorfulSquare) => {
      square.setDefaultColor();
    });
  }
}
