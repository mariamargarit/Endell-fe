import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttributeValue } from 'src/app/models/attribute-value.model';
import { ProductAttribute } from 'src/app/models/product-attribute.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { AttributeValueService } from 'src/app/services/attribute-value.service';
import { ProductAttributeService } from 'src/app/services/product-attribute.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-admin-add-values-dialog',
  templateUrl: './admin-add-values-dialog.component.html',
  styleUrls: ['./admin-add-values-dialog.component.css']
})
export class AdminAddValuesDialogComponent {

  attributeValues: AttributeValue[]
  constructor(
    public dialogRef: MatDialogRef<AdminAddValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductAttribute,
    private attributeValueService: AttributeValueService,
    private productAttributeService: ProductAttributeService
  ) {}
  ngOnInit(): void {
    this.getAttributeValues();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getAttributeValues() {
    this.attributeValueService.getAttributeValues().subscribe((res) => {
      this.attributeValues = res;
    });
  }

  addValuesToProductAttribute(valueId: number, id: number|undefined) {
    this.productAttributeService.addValuesToProductAttribute(valueId, id).subscribe((res) => {
      console.log(res);
    });
  }

  
  changeValue(event: any, id: number|undefined)
  {
    if(event.isUserInput) {
      if(event.source.selected === true){
        console.log(event.source.value, event.source.selected);
        this.addValuesToProductAttribute(event.source.value.id, id)
      }
    }
  }
}
