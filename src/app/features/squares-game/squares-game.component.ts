import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { SquaresGameService } from '@features/squares-game/services/squares-game.service';
import { ScoreComponent } from '@features/squares-game/components/score/score.component';
import {
  SquaresFormValue,
  SquaresGameConfigurationsComponent,
} from '@features/squares-game/components/squares-game-configurations/squares-game-configurations.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SquaresDataService } from '@features/squares-game/services/squares-data.service';
import { SquaresListComponent } from '@features/squares-game/components/squares-list/squares-list.component';

@Component({
  selector: 'app-squares-game',
  standalone: true,
  imports: [
    ScoreComponent,
    SquaresGameConfigurationsComponent,
    SquaresListComponent,
  ],
  templateUrl: './squares-game.component.html',
  styleUrl: './squares-game.component.scss',
  providers: [SquaresGameService, SquaresDataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquaresGameComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly squaresGameService = inject(SquaresGameService);
  private readonly squaresDataService = inject(SquaresDataService);

  public readonly squares = this.squaresDataService.squaresSignal;

  public ngOnInit(): void {
    this.squaresDataService.generateSquares(100);
  }

  public startGame({ reactionTime }: SquaresFormValue): void {
    this.squaresGameService
      .startGame(reactionTime)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
