import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { AdminBrandDialogComponent } from './admin-brand-dialog/admin-brand-dialog.component';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.css']
})
export class AdminBrandComponent implements OnInit {

  displayedColumns: string[] = ['name', 'products', 'delete'];
  dataSource = new MatTableDataSource<Brand>();
  name: string;
  brand: Brand;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private brandService: BrandService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBrands();
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
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
      })
  }

  deleteBrand(id: number){
    this.brandService.deleteBrand(id)
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getBrands();
    }, err => {
      console.log(err);})
  }

  addBrand(name: string){
    const brand: Brand = {name: name};
    this.brandService.addBrand(brand)
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getBrands();
    }, err => {
      console.log(err);})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminBrandDialogComponent, {
      width: '300px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.name = result;
        this.addBrand(this.name);
      }
    });
  }

}
