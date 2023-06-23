import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductAttribute } from 'src/app/models/product-attribute.model';

@Component({
  selector: 'app-admin-product-attributes-dialog',
  templateUrl: './admin-product-attributes-dialog.component.html',
  styleUrls: ['./admin-product-attributes-dialog.component.css']
})
export class AdminProductAttributesDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<AdminProductAttributesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductAttribute,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
