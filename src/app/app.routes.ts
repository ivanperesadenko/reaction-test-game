import { Routes } from '@angular/router';
import { SquaresGameComponent } from '@features/squares-game/squares-game.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'squares-game',
  },
  {
    path: 'squares-game',
    component: SquaresGameComponent,
  },
  {
    path: '**',
    redirectTo: 'squares-game',
  },
];
