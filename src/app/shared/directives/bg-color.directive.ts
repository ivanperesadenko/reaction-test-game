import {
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appBgColor]',
  standalone: true,
})
export class BgColorDirective implements OnChanges {
  private elementRef: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  public appBgColor = input.required<string>();

  public ngOnChanges(changes: SimpleChanges) {
    this.setBackgroundColor(changes['appBgColor'].currentValue);
  }

  private setBackgroundColor(color: string): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      color
    );
  }
}
