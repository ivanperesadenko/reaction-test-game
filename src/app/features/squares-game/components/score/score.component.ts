import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ScoreService } from '@features/squares-game/services/score.service';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
  private readonly scoreService = inject(ScoreService);

  public score = this.scoreService.totalScore;
}
