import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AdminProductsDialogComponent } from './admin-products-dialog/admin-products-dialog.component';
import { Brand } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'subcategory-id', 'brand', 'price', 'image', 'delete'];
  dataSource = new MatTableDataSource<Product>();
  name: string;
  image: string| ArrayBuffer| null;
  description: string;
  id: number;
  price: number;
  brand: string;
  brands: Brand[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService, private dialog: MatDialog, private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
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

  getBrands(){
    this.brandService.getBrands()
      .subscribe((res) => {
        this.brands = res;
      })
  }

  getProducts(){
    this.productService.getProducts()
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
      })
  }

  createProduct(id: number, name: string, price: number) {
    const product: Product = {name: name, price: price};

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
  

  updateProduct(id: number, product: Product){
    this.productService.updateProduct(id, product)
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getProducts();
    }, err => {
      console.log(err);})
  }

  handleChange(event: any, product: Product, id: number){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      product.image = reader.result;
      this.updateProduct(id, product);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminProductsDialogComponent, {
      width: '300px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res !== undefined){
        this.name = res.name;
        this.id = res.id;
        this.price = res.price;
        console.log("res", res);
        this.createProduct(this.id, this.name, this.price);
      }
    });
  }
  
  addBrandToProduct(brandId: number, id: number|undefined) {
    console.log("brandid", brandId);
    console.log("productid", id);
    this.productService.addBrandToProduct(brandId, id).subscribe((res) => {
      console.log(res);
    });
  }

  changeValue(event: any, id: number|undefined)
  {
    if(event.isUserInput) {
      if(event.source.selected === true){
        console.log("dads",event.source.value, event.source.selected);
        this.addBrandToProduct(event.source.value, id)
      }
    }
  }

}
