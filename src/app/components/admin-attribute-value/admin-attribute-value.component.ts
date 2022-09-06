import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttributeValue } from 'src/app/models/attribute-value.model';
import { AttributeValueService } from 'src/app/services/attribute-value.service';
import { AdminAttributeValuesDialogComponent } from './admin-attribute-values-dialog/admin-attribute-values-dialog.component';

@Component({
  selector: 'app-admin-attribute-value',
  templateUrl: './admin-attribute-value.component.html',
  styleUrls: ['./admin-attribute-value.component.css']
})
export class AdminAttributeValueComponent implements OnInit {

  displayedColumns: string[] = ['val', 'delete'];
  dataSource = new MatTableDataSource<AttributeValue>();
  val: string;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private attributeValueService: AttributeValueService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAttributeValues();
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

  getAttributeValues(){
    this.attributeValueService.getAttributeValues()
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
      })
  }

  createAttributeValue(id: number, val: string) {
    const attributeValue: AttributeValue = {val: val};

    this.attributeValueService
      .createAttributeValue(id, attributeValue)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getAttributeValues();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteAttributeValue(id: number){
    this.attributeValueService.deleteAttributeValue(id)
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAttributeValues();
    }, err => {
      console.log(err);})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminAttributeValuesDialogComponent, {
      width: '300px',
      data: {name: this.val}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res !== undefined){
        this.val = res.val;
        this.id = res.id;
        this.createAttributeValue(this.id, this.val);
      }
    });
  }

}
