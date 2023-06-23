import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Brand } from 'src/app/models/brand.model';

@Component({
  selector: 'app-admin-brand-dialog',
  templateUrl: './admin-brand-dialog.component.html',
  styleUrls: ['./admin-brand-dialog.component.css']
})
export class AdminBrandDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<AdminBrandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Brand,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
