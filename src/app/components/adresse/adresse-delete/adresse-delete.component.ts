import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StandortService} from "../../../core/services/standort.service";
import {Adresse} from "../../../core/entities/Adresse";
import {AdresseService} from "../../../core/services/adresse.service";

@Component({
  selector: 'app-adresse-delete',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './adresse-delete.component.html',
  styleUrl: './adresse-delete.component.css'
})
export class AdresseDeleteComponent {
  public adresse: Adresse = {id:"",strasse:"",hausnummer:"",postleitzahl:"",ort:"",land:""}

  constructor(private dialogRef: MatDialogRef<AdresseDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private adressService: AdresseService) {
    this.adresse = data.adresse;
  }

  public deleteAdress(): void {
    this.adressService.deleteAdress(this.data.adresse.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
