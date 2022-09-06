import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AdminCategoriesDialogComponent } from './admin-categories-dialog/admin-categories-dialog.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'subcategories', 'delete'];
  dataSource = new MatTableDataSource<Category>();
  name: string;
  category: Category;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCategories();
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

  getCategories(){
    this.categoryService.getCategories()
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
      })
  }

  deleteCategory(id: number){
    this.categoryService.deleteCategory(id)
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getCategories();
    }, err => {
      console.log(err);})
  }

  addCategory(name: string){
    const category: Category = {name: name};
    this.categoryService.addCategory(category)
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getCategories();
    }, err => {
      console.log(err);})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminCategoriesDialogComponent, {
      width: '300px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.name = result;
        this.addCategory(this.name);
      }
    });
  }

}
