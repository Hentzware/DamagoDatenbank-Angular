import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Adresse} from "../../../core/entities/Adresse";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdresseService} from "../../../core/services/adresse.service";
import {Inventar} from "../../../core/entities/Inventar";
import {InventarService} from "../../../core/services/inventar.service";

@Component({
  selector: 'app-inventar-edit',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './inventar-edit.component.html',
  styleUrl: './inventar-edit.component.css'
})
export class InventarEditComponent {
  public inventar: Inventar = {id:"",name:"",anzahl:0}

  constructor(private dialogRef: MatDialogRef<InventarEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private inventarService: InventarService) {
    this.inventar = data.inventar;
  }

  public editInventory(): void {

    this.inventarService.update(this.data.inventar).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
