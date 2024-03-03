import {Component} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {InventoryService} from "../../../core/services/inventory.service";
import {Inventory} from "../../../core/entities/Inventory";

@Component({
  selector: 'app-inventory-new',
  standalone: true,
  imports: [FlexModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule, FormsModule],
  templateUrl: './inventory-new.component.html',
  styleUrl: './inventory-new.component.css'
})
export class InventoryNewComponent {
  public inventory: Inventory = {id: "", name: "", amount: 0}

  constructor(private inventarService: InventoryService, private dialogRef: MatDialogRef<InventoryNewComponent>) {
  }

  public save(): void {
    this.inventarService.add(this.inventory).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
