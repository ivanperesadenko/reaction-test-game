import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  OutputEmitterRef,
  WritableSignal,
} from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SquaresGameService } from '@features/squares-game/services/squares-game.service';

interface SquaresForm {
  reactionTime: FormControl<number>;
}

export interface SquaresFormValue {
  reactionTime: number;
}

@Component({
  selector: 'app-squares-game-configurations',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatError,
  ],
  templateUrl: './squares-game-configurations.component.html',
  styleUrl: './squares-game-configurations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquaresGameConfigurationsComponent {
  private readonly squaresGameService: SquaresGameService =
    inject(SquaresGameService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  public readonly startGame: OutputEmitterRef<SquaresFormValue> =
    output<SquaresFormValue>();

  public readonly isGameActive: WritableSignal<boolean> =
    this.squaresGameService.isGameActive;
  public readonly configurationForm: FormGroup<SquaresForm> = this.fb.group({
    reactionTime: this.fb.control(1000, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(100)],
    }),
  });

  public submitForm(): void {
    if (this.configurationForm.invalid) {
      this.configurationForm.markAllAsTouched();
      return;
    }

    const formValue: SquaresFormValue = this.configurationForm.getRawValue();

    this.startGame.emit(formValue);
  }
}
