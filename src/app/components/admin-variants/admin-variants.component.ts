import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Variant } from 'src/app/models/variant.model';
import { VariantService } from 'src/app/services/variant.service';
import { AdminVariantsDialogComponent } from './admin-variants-dialog/admin-variants-dialog.component';
import { AdminAddAssignedValuesDialogComponent } from './admin-add-assigned-values-dialog/admin-add-assigned-values-dialog.component';
import { AssignedValue } from 'src/app/models/assigned-value.model';
import { VariantCreation } from 'src/app/models/variant-creation.model';

@Component({
  selector: 'app-admin-variants',
  templateUrl: './admin-variants.component.html',
  styleUrls: ['./admin-variants.component.css']
})
export class AdminVariantsComponent implements OnInit {

  displayedColumns: string[] = ['product', 'available-quantity', 'added-date', 'assigned-values', 'delete', 'add-assigned-values'];
  dataSource = new MatTableDataSource<Variant>();
  subcategories: string[] = [];
  availableQuantity: number;
  price: number;
  addedDate: string;
  id: number;
  assignedValueDTOList: number[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private variantService: VariantService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getVariants();
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

  getVariants(){
    this.variantService.getVariants()
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
      })
  }

  createVariant(id: number, availableQuantity: number, addedDate: string) {
    const variant: VariantCreation = {availableQuantity: availableQuantity,  addedDate: addedDate};

    this.variantService
      .createVariant(id, variant)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.getVariants();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteVariant(id: number){
    this.variantService.deleteVariant(id)
      .subscribe((res)=>{
        console.log(res);
        console.log("ID", id);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getVariants();
    }, err => {
      console.log(err);})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminVariantsDialogComponent, {
      width: '300px',
      data: {name: this.availableQuantity}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res !== undefined){
        console.log("DATA", res);
        this.availableQuantity = res.availableQuantity;
        this.addedDate = res.addedDate;
        this.id = res.id;
        this.createVariant(this.id, this.availableQuantity, this.addedDate);
      }
    });
  }

  
  openAssignedValuesDialog(variant: Variant): void {
    const dialogRef = this.dialog.open(AdminAddAssignedValuesDialogComponent, {
      width: '300px',
      data: variant,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getVariants();
    });
  }
}
