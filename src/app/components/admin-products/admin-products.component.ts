import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AdminProductsDialogComponent } from './admin-products-dialog/admin-products-dialog.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'subcategory-id', 'delete'];
  dataSource = new MatTableDataSource<Product>();
  name: string;
  description: string;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getProducts();
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

  getProducts(){
    this.productService.getProducts()
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
      })
  }

  createProduct(id: number, description: string, name: string) {
    const product: Product = {name: name, description: description};

    this.productService
      .createProduct(id, product)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.getProducts();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id)
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getProducts();
    }, err => {
      console.log(err);})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminProductsDialogComponent, {
      width: '300px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res !== undefined){
        this.name = res.name;
        this.description = res.description;
        this.id = res.id;
        this.createProduct(this.id, this.description, this.name);
      }
    });
  }

}
