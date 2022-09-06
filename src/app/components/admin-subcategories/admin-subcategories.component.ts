import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { AdminSubcategoriesDialogComponent } from './admin-subcategories-dialog/admin-subcategories-dialog.component';

@Component({
  selector: 'app-admin-subcategories',
  templateUrl: './admin-subcategories.component.html',
  styleUrls: ['./admin-subcategories.component.css']
})
export class AdminSubcategoriesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'delete'];
  dataSource = new MatTableDataSource<Subcategory>();
  subcategories: string[] = [];
  name: string; 
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private subcategoryService: SubcategoryService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
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

  getSubcategories(){
    this.subcategoryService.getSubcategories()
      .subscribe((res)=>{
        this.dataSource.data = res;
      })
  }

  createSubcategory(id: number, name: string) {
    const subcategory: Subcategory = {name: name};

    this.subcategoryService
      .createSubcategory(id, subcategory)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.getSubcategories();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteSubcategory(id: number){
    this.subcategoryService.deleteSubcategory(id)
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getSubcategories();
    }, err => {
      console.log(err);})
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AdminSubcategoriesDialogComponent, {
      width: '300px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res !== undefined){
        this.name = res.name;
        this.id = res.id;
        this.createSubcategory(this.id, this.name);
      }
    });
  }
}
