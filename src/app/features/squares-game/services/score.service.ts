import { computed, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private readonly pointsToWin: WritableSignal<number> = signal(10);
  private readonly playerScore: WritableSignal<number> = signal(0);
  private readonly computerScore: WritableSignal<number> = signal(0);

  public readonly totalScore = computed(() => ({
    player: this.playerScore(),
    computer: this.computerScore(),
  }));
  public readonly isWin = computed(
    () => this.playerScore() === this.pointsToWin()
  );
  public readonly isGameFinished = computed(() => {
    return (
      this.playerScore() === this.pointsToWin() ||
      this.computerScore() === this.pointsToWin()
    );
  });

  public changePointsToWin(value: number): void | never {
    if (value < 0 || value === 0) {
      throw new Error('Points to win must be greater than 0');
    } else {
      this.pointsToWin.set(value);
    }
  }

  public resetScore(): void {
    this.playerScore.set(0);
    this.computerScore.set(0);
  }

  public setPointToPlayer(): void {
    this.playerScore.update(prev => prev + 1);
  }

  public setPointToComputer(): void {
    this.computerScore.update(prev => prev + 1);
  }
}
