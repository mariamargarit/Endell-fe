import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductAttribute } from 'src/app/models/product-attribute.model';
import { ProductAttributeService } from 'src/app/services/product-attribute.service';

@Component({
  selector: 'app-admin-product-attributes',
  templateUrl: './admin-product-attributes.component.html',
  styleUrls: ['./admin-product-attributes.component.css']
})
export class AdminProductAttributesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'attribute-value', 'subcategories', 'delete'];
  dataSource = new MatTableDataSource<ProductAttribute>();
  subcategories: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productAttributeService: ProductAttributeService) {
  }

  ngOnInit(): void {
    this.getProductAttributes();
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

  getProductAttributes(){
    this.productAttributeService.getProductAttributes()
      .subscribe((res)=>{
        console.log(res);
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


}
