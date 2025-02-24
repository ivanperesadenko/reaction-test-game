import { inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  public open<TComponent extends object, TData, TOutput>(
    component: ComponentType<TComponent>,
    options: MatDialogConfig<TData>
  ): MatDialogRef<TComponent> {
    return this.dialog.open<TComponent, TData, TOutput>(component, options);
  }
}
