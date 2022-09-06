import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-categories-dialog',
  templateUrl: './admin-categories-dialog.component.html',
  styleUrls: ['./admin-categories-dialog.component.css']
})
export class AdminCategoriesDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AdminCategoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
