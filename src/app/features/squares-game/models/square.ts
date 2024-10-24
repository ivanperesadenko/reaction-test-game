import { BehaviorSubject, Observable } from 'rxjs';
import { SquareColorsType } from '@features/squares-game/types/square-colors.type';
import { SquareColorsPaletteInterface } from '@features/squares-game/constants/square-colors';

export class Square {}

export class ColorfulSquare<
  TColorsUnion extends string,
  TPalette extends { default: TColorsUnion },
> extends Square {
  private color$$: BehaviorSubject<TColorsUnion>;
  protected palette: TPalette;

  constructor(palette: TPalette) {
    super();

    this.color$$ = new BehaviorSubject(palette.default);
    this.palette = palette;
  }

  public get color(): TColorsUnion {
    return this.color$$.value;
  }

  public get color$(): Observable<TColorsUnion> {
    return this.color$$.asObservable();
  }

  protected setColor(color: TColorsUnion): void {
    this.color$$.next(color);
  }
}

export class CustomColorfulSquare extends ColorfulSquare<
  SquareColorsType,
  SquareColorsPaletteInterface
> {
  public state: keyof SquareColorsPaletteInterface = 'default';

  constructor(palette: SquareColorsPaletteInterface) {
    super(palette);
  }

  public setDefaultColor() {
    this.state = 'default';
    this.setColor(this.palette.default);
  }

  public setActiveColor() {
    this.state = 'active';
    this.setColor(this.palette.active);
  }

  public setSuccessColor() {
    this.state = 'success';
    this.setColor(this.palette.success);
  }

  public setFailureColor() {
    this.state = 'failure';
    this.setColor(this.palette.failure);
  }
}

export type CustomColorfulSquareArgs = SquareColorsPaletteInterface[];
