import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-squares-game',
  standalone: true,
  imports: [],
  templateUrl: './squares-game.component.html',
  styleUrl: './squares-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquaresGameComponent {

}
