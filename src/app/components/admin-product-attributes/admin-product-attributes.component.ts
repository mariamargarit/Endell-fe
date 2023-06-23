import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductAttribute } from 'src/app/models/product-attribute.model';
import { ProductAttributeService } from 'src/app/services/product-attribute.service';
import { AdminProductAttributesDialogComponent } from './admin-product-attributes-dialog/admin-product-attributes-dialog.component';
import { FormControl } from '@angular/forms';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Subcategory } from 'src/app/models/subcategory.model';
import { AttributeValueService } from 'src/app/services/attribute-value.service';
import { AttributeValue } from 'src/app/models/attribute-value.model';
import { AdminAddValuesDialogComponent } from './admin-add-values-dialog/admin-add-values-dialog.component';
import { AdminAddSubcategoriesDialogComponent } from './admin-add-subcategories-dialog/admin-add-subcategories-dialog.component';

@Component({
  selector: 'app-admin-product-attributes',
  templateUrl: './admin-product-attributes.component.html',
  styleUrls: ['./admin-product-attributes.component.css']
})
export class AdminProductAttributesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'attribute-value', 'subcategories', 'delete', 'add-subcategory', 'add-value'];
  dataSource = new MatTableDataSource<ProductAttribute>();
  subcategories: Subcategory[];
  attributeValues: AttributeValue[];
  name:string;
  subcategoriesFormControl = new FormControl('');
  attributeValueFormControl = new FormControl('');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productAttributeService: ProductAttributeService, 
    private dialog: MatDialog,
    private subcategoryService: SubcategoryService,
    private attributeValueService: AttributeValueService) {
  }

  ngOnInit(): void {
    this.getProductAttributes();
    this.getSubcategories();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addProductAttribute(name: string){
    const productAttribute: ProductAttribute = {name: name, attributeValues: []};
    this.productAttributeService.createProductAttribute(productAttribute)
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getProductAttributes();
    }, err => {
      console.log(err);})
  }

  getProductAttributes(){
    this.productAttributeService.getProductAttributes()
      .subscribe((res)=>{
        console.log("adfa",res);
        this.dataSource.data = res;
      })
  }

  deleteProductAttribute(id: number){
    this.productAttributeService.deleteProductAttribute(id)
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getProductAttributes();
    }, err => {
      console.log(err);})
  }

  getSubcategories() {
    this.subcategoryService.getSubcategories().subscribe((res) => {
      this.subcategories = res;
    });
  }

  getAttributeValues() {
    this.attributeValueService.getAttributeValues().subscribe((res) => {
      this.attributeValues = res;
    })
  }

  addSubcategoriesToProductAttribute(subcategoryId: number, id: number) {
    this.productAttributeService.addSubcategoryToProductAttribute(subcategoryId, id).subscribe((res) => {
      console.log(res);
    });
  }

  addValuesToProductAttribute(valueId: number, id: number) {
    this.productAttributeService.addValuesToProductAttribute(valueId, id).subscribe((res) => {
      console.log(res);
    });
  }

  changeAttributeValue(event: any, id: number)
  {
    if(event.isUserInput) {
      if(event.source.selected === true){
        console.log(event.source.value, event.source.selected);
        this.addValuesToProductAttribute(event.source.value.id, id)
      }
      else{

      }
    }
  }

  changeSubcategory(event: any, id: number)
  {
    if(event.isUserInput) {
      if(event.source.selected === true){
        console.log(event.source.value, event.source.selected);
        this.addSubcategoriesToProductAttribute(event.source.value.id, id)
      }
      else{

      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminProductAttributesDialogComponent, {
      width: '300px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.name = result;
        this.addProductAttribute(this.name);
      }
    });
  }

  openValueDialog(id: number): void {
    const dialogRef = this.dialog.open(AdminAddValuesDialogComponent, {
      width: '300px',
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductAttributes();
    });
  }

  openSubcategoryDialog(id: number, subcategories: Subcategory[]): void {
    const dialogRef = this.dialog.open(AdminAddSubcategoriesDialogComponent, {
      width: '300px',
      data: {id: id, subcategories:subcategories},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("sad", result);
      this.getProductAttributes();
    });
  }

}
