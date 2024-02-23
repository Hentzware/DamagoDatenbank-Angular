import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {Inventar} from "../../../core/entities/Inventar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InventarService} from "../../../core/services/inventar.service";
import {Raum} from "../../../core/entities/Raum";
import {RaumService} from "../../../core/services/raum.service";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {Adresse} from "../../../core/entities/Adresse";
import {AdresseService} from "../../../core/services/adresse.service";

@Component({
  selector: 'app-raeume-delete',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './raeume-delete.component.html',
  styleUrl: './raeume-delete.component.css'
})
export class RaeumeDeleteComponent {

  public raum: Raum = {id:"",name:"",nr:""}

  constructor(private dialogRef: MatDialogRef<RaeumeDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private raumService: RaumService) {
    this.raum = data.raum;
  }

  public deleteRoom(): void {
    this.raumService.delete(this.data.raum.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}

