import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {Inventory} from "../../../core/entities/Inventory";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InventoryService} from "../../../core/services/inventory.service";

@Component({
  selector: 'app-inventar-delete', standalone: true, imports: [FlexModule, MatButton, MatLabel], templateUrl: './inventar-delete.component.html', styleUrl: './inventar-delete.component.css'
})
export class InventarDeleteComponent {
  public inventory: Inventory = {id: "", name: "", amount: 0}

  constructor(private dialogRef: MatDialogRef<InventarDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private inventoryService: InventoryService) {
    this.inventory = data.inventory;
  }

  public save(): void {
    this.inventoryService.delete(this.data.inventory.id).subscribe(() => {
      this.dialogRef.close();
    })
  }
}
