import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { EndGameModalData } from '@shared/components/dialogs/end-game-dialog/types/end-game-modal-data.type';
import { CONTENT_TEXTS } from '@shared/components/dialogs/end-game-dialog/content-texts/content-texts';
import { ScoreComponent } from '@features/squares-game/components/score/score.component';

@Component({
  selector: 'app-end-game-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatIcon,
    MatDialogContainer,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ScoreComponent,
  ],
  templateUrl: './end-game-dialog.component.html',
  styleUrl: './end-game-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndGameDialogComponent {
  public data = inject(MAT_DIALOG_DATA) as EndGameModalData;

  public dialogTitle: string = this.data.isWin
    ? CONTENT_TEXTS.successTitle
    : CONTENT_TEXTS.failureTitle;
  public icon = this.data.isWin
    ? CONTENT_TEXTS.successIcon
    : CONTENT_TEXTS.failureIcon;
  public dialogContentMessage: string = this.data.isWin
    ? CONTENT_TEXTS.successContentMessage
    : CONTENT_TEXTS.failureContentMessage;
}
