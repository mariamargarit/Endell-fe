import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignedValue } from 'src/app/models/assigned-value.model';
import { Product } from 'src/app/models/product.model';
import { Variant } from 'src/app/models/variant.model';
import { AssignedValueService } from 'src/app/services/assigned-value.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-variants-dialog',
  templateUrl: './admin-variants-dialog.component.html',
  styleUrls: ['./admin-variants-dialog.component.css']
})
export class AdminVariantsDialogComponent implements OnInit {

  products: Product[];
  assignedValues: AssignedValue[];

  constructor(
    public dialogRef: MatDialogRef<AdminVariantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public variantData: Variant,
    @Inject(MAT_DIALOG_DATA) public productData: Product,
    private productService: ProductService,
    private assignedValueService: AssignedValueService
  ) {
    variantData.addedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }
  ngOnInit(): void {
    this.getProducts();
    this.getAssignedValues();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  getAssignedValues() {
    this.assignedValueService.getAssignedValues().subscribe((res) => {
      this.assignedValues = res;
    });
  }

}
