import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-subcategories-dialog',
  templateUrl: './admin-subcategories-dialog.component.html',
  styleUrls: ['./admin-subcategories-dialog.component.css'],
})
export class AdminSubcategoriesDialogComponent implements OnInit {
  categories: Category[];

  constructor(
    public dialogRef: MatDialogRef<AdminSubcategoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public subcategoryData: Subcategory,
    @Inject(MAT_DIALOG_DATA) public categoryData: Category,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
      console.log("res", res);
    });
  }
}
