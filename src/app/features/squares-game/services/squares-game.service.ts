import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  concatMap,
  filter,
  fromEvent,
  interval,
  last,
  map,
  Observable,
  race,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  timer,
} from 'rxjs';
import { DialogService } from '../../../core/services/dialog-service/dialog.service';
import { CustomColorfulSquare } from '@features/squares-game/models/square';
import { SquaresDataService } from '@features/squares-game/services/squares-data.service';
import { ScoreService } from '@features/squares-game/services/score.service';
import { EndGameDialogComponent } from '@shared/components/dialogs/end-game-dialog/end-game-dialog.component';
import { EndGameModalData } from '@shared/components/dialogs/end-game-dialog/types/end-game-modal-data.type';
import { getRandomNumber } from '@utils/get-random-number/get-random-number';

@Injectable()
export class SquaresGameService {
  private readonly squaresDataService = inject(SquaresDataService);
  private readonly scoreService = inject(ScoreService);
  private readonly dialogService = inject(DialogService);

  public readonly isGameActive: WritableSignal<boolean> = signal(false);

  public startGame(reactionTime: number | string): Observable<unknown> {
    this.initializeGame();

    const squares: CustomColorfulSquare[] = this.squaresDataService.squares;
    const getRandomIndex = getRandomNumber(squares.length);
    const validReactionTime = Number(reactionTime);

    return this.createGameInterval(validReactionTime).pipe(
      map(_ => getRandomIndex()),
      filter(randomIndex => randomIndex !== null),
      tap(randomIndex => squares[randomIndex].setActiveColor()),
      map(index => this.getSquareSignatures(index)),
      concatMap(({ square, squareDOMElement }) =>
        this.handleSquareEvents(square, squareDOMElement, validReactionTime)
      ),
      takeWhile(() => !this.scoreService.isGameFinished()),
      last(),
      tap(() => this.isGameActive.set(false)),
      switchMap(() => this.showEndGameDialog()),
      switchMap(() => this.startGame(reactionTime))
    );
  }

  private initializeGame(): void {
    this.isGameActive.set(true);
    this.squaresDataService.resetSquaresState();
    this.scoreService.resetScore();
  }

  private createGameInterval(reactionTime: number): Observable<number> {
    return interval(reactionTime + 500);
  }

  private getSquareSignatures(index: number) {
    return {
      square: this.squaresDataService.getEntityByIndex(index),
      squareDOMElement:
        this.squaresDataService.getSquareDOMElementByIndex(index),
    };
  }

  private handleSquareEvents(
    square: CustomColorfulSquare,
    squareDOMElement: Node,
    reactionTime: number
  ): Observable<unknown> {
    const click$ = fromEvent(squareDOMElement, 'click').pipe(
      tap(() => {
        square.setSuccessColor();
        this.scoreService.setPointToPlayer();
      }),
      takeUntil(timer(reactionTime))
    );

    const timeout$ = timer(reactionTime).pipe(
      tap(() => {
        square.setFailureColor();
        this.scoreService.setPointToComputer();
      })
    );

    return race(timeout$, click$);
  }

  private showEndGameDialog(): Observable<boolean> {
    return this.dialogService
      .open<EndGameDialogComponent, EndGameModalData, boolean>(
        EndGameDialogComponent,
        {
          autoFocus: false,
          data: {
            score: this.scoreService.totalScore(),
            isWin: this.scoreService.isWin(),
          },
        }
      )
      .afterClosed()
      .pipe(filter(Boolean));
  }
}
