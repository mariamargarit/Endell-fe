import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductAttribute } from 'src/app/models/product-attribute.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { ProductAttributeService } from 'src/app/services/product-attribute.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-admin-add-subcategories-dialog',
  templateUrl: './admin-add-subcategories-dialog.component.html',
  styleUrls: ['./admin-add-subcategories-dialog.component.css']
})
export class AdminAddSubcategoriesDialogComponent implements OnInit {
  subcategories: Subcategory[]
  constructor(
    public dialogRef: MatDialogRef<AdminAddSubcategoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductAttribute,
    private subcategoryService: SubcategoryService,
    private productAttributeService: ProductAttributeService
  ) {}
  ngOnInit(): void {
    this.getSubcategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getSubcategories() {
    this.subcategoryService.getSubcategories().subscribe((res) => {
      this.subcategories = res;
    });
  }

  addSubcategoriesToProductAttribute(subcategoryId: number, id: number|undefined) {
    this.productAttributeService.addSubcategoryToProductAttribute(subcategoryId, id).subscribe((res) => {
      console.log(res);
    });
  }

  
  changeSubcategory(event: any, id: number|undefined)
  {
    if(event.isUserInput) {
      if(event.source.selected === true){
        console.log(event.source.value, event.source.selected);
        this.addSubcategoriesToProductAttribute(event.source.value.id, id)
      }
    }
  }
}
