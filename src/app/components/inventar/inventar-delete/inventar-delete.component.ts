import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {Inventar} from "../../../core/entities/Inventar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InventarService} from "../../../core/services/inventar.service";

@Component({
  selector: 'app-inventar-delete',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    MatLabel
  ],
  templateUrl: './inventar-delete.component.html',
  styleUrl: './inventar-delete.component.css'
})
export class InventarDeleteComponent {
  public inventar: Inventar = {id:"",name:"",anzahl:0}
  constructor(private dialogRef: MatDialogRef<InventarDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private inventarService: InventarService) {
    this.inventar = data.inventar;
  }
  public deleteInventory(): void {
    this.inventarService.delete(this.data.inventar.id).subscribe(()=> {
      this.dialogRef.close();
    })
  }
}
