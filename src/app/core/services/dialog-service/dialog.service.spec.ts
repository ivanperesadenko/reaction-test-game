import { DialogService } from './dialog.service';
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

describe('DialogService', () => {
  let service: DialogService;
  let matDialogMock: jest.Mocked<MatDialog>;
  const matDialogSpy = {
    open: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: MatDialog, useValue: matDialogSpy }
      ],
    });

    service = TestBed.inject(DialogService);
    matDialogMock = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open dialog with provided component and options', () => {
    const dummyComponent = {} as ComponentType<object>;
    const config = {} as MatDialogConfig<unknown>;
    const fakeDialogRef = {} as MatDialogRef<object>;

    matDialogMock.open.mockReturnValue(fakeDialogRef);
    const result = service.open(dummyComponent, config);

    expect(matDialogMock.open).toHaveBeenCalledWith(dummyComponent, config);
    expect(result).toBe(fakeDialogRef);
  });
});