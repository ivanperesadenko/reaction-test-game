import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  InputSignal,
  viewChild,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { CustomColorfulSquare } from '@features/squares-game/models/square';
import { SquaresDataService } from '@features/squares-game/services/squares-data.service';
import { SquareComponent } from '@shared/components/square/square.component';
import { BgColorDirective } from '@shared/directives/bg-color.directive';

@Component({
  selector: 'app-squares-list',
  standalone: true,
  imports: [AsyncPipe, SquareComponent, BgColorDirective],
  templateUrl: './squares-list.component.html',
  styleUrl: './squares-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquaresListComponent implements AfterViewInit {
  private readonly squaresDataService = inject(SquaresDataService);

  public readonly squaresContainer =
    viewChild.required<ElementRef>('squaresContainer');
  public readonly squares: InputSignal<CustomColorfulSquare[]> =
    input.required();

  public ngAfterViewInit(): void {
    this.getSquaresNodeList();
  }

  private getSquaresNodeList(): void {
    this.squaresDataService.squaresNodeList =
      this.squaresContainer().nativeElement.childNodes;
  }
}
