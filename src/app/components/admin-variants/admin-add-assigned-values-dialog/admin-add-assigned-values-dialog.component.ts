import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignedValue } from 'src/app/models/assigned-value.model';
import { Variant } from 'src/app/models/variant.model';
import { AssignedValueService } from 'src/app/services/assigned-value.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-admin-add-assigned-values-dialog',
  templateUrl: './admin-add-assigned-values-dialog.component.html',
  styleUrls: ['./admin-add-assigned-values-dialog.component.css']
})
export class AdminAddAssignedValuesDialogComponent {

  assignedValues: AssignedValue[]
  constructor(
    public dialogRef: MatDialogRef<AdminAddAssignedValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Variant,
    private assignedValueService: AssignedValueService,
    private variantService: VariantService
  ) {}
  ngOnInit(): void {
    this.getAssignedValues();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAssignedValues() {
    this.assignedValueService.getAssignedValues().subscribe((res) => {
      console.log("oplsplspsl", res);
      this.assignedValues = res;
    });
  }

  addValuesToVariant(valueId: number, id: number|undefined) {
    this.variantService.addValuesToVariant(valueId, id).subscribe((res) => {
      console.log("var",res);
    });
  }

  
  changeValue(event: any, id: number|undefined)
  {
    if(event.isUserInput) {
      if(event.source.selected === true){
        console.log(event.source.value, event.source.selected);
        console.log("dsadas", id);
        this.addValuesToVariant(event.source.value.id, id)
      }
    }
  }
}
