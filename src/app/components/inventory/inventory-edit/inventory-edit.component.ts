import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Inventory} from "../../../core/entities/Inventory";
import {InventoryService} from "../../../core/services/inventory.service";

@Component({
  selector: 'app-inventory-edit',
  standalone: true,
  imports: [FlexModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule, FormsModule],
  templateUrl: './inventory-edit.component.html',
  styleUrl: './inventory-edit.component.css'
})
export class InventoryEditComponent {
  public inventory: Inventory = {id: "", name: "", amount: 0}

  constructor(private dialogRef: MatDialogRef<InventoryEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private inventoryService: InventoryService) {
    this.inventory = data.inventory;
  }

  public save(): void {
    this.inventoryService.update(this.inventory).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
