import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-admin-products-dialog',
  templateUrl: './admin-products-dialog.component.html',
  styleUrls: ['./admin-products-dialog.component.css'],
})
export class AdminProductsDialogComponent implements OnInit {
  subcategories: Subcategory[];

  constructor(
    public dialogRef: MatDialogRef<AdminProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public subcategoryData: Subcategory,
    @Inject(MAT_DIALOG_DATA) public productData: Product,
    private subcategoryService: SubcategoryService
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCategories() {
    this.subcategoryService.getSubcategories().subscribe((res) => {
      this.subcategories = res;
    });
  }
}
