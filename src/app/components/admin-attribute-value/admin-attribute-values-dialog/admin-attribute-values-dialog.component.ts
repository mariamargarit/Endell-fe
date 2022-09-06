import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeValue } from 'src/app/models/attribute-value.model';
import { ProductAttribute } from 'src/app/models/product-attribute.model';
import { ProductAttributeService } from 'src/app/services/product-attribute.service';

@Component({
  selector: 'app-admin-attribute-values-dialog',
  templateUrl: './admin-attribute-values-dialog.component.html',
  styleUrls: ['./admin-attribute-values-dialog.component.css']
})
export class AdminAttributeValuesDialogComponent implements OnInit {

  productAttributes: ProductAttribute[];

  constructor(
    public dialogRef: MatDialogRef<AdminAttributeValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productAttributeData: ProductAttribute,
    @Inject(MAT_DIALOG_DATA) public attributeValueData: AttributeValue,
    private productAttributeService: ProductAttributeService
  ) {}
  ngOnInit(): void {
    this.getProductAttributes();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getProductAttributes() {
    this.productAttributeService.getProductAttributes().subscribe((res) => {
      console.log(res);
      this.productAttributes = res;
    });
  }

}
