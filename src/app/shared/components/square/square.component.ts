import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareComponent {}
