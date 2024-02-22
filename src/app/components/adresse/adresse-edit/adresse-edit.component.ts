import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StandortService} from "../../../core/services/standort.service";
import {Adresse} from "../../../core/entities/Adresse";
import {AdresseService} from "../../../core/services/adresse.service";

@Component({
  selector: 'app-adresse-edit',
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
  templateUrl: './adresse-edit.component.html',
  styleUrl: './adresse-edit.component.css'
})
export class AdresseEditComponent {
  public adresse: Adresse = {id:"",strasse:"",hausnummer:"",postleitzahl:"",ort:"",land:""}

  constructor(private dialogRef: MatDialogRef<AdresseEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private adresseService: AdresseService) {
    this.adresse = data.adresse;
  }

  public editAdress(): void {

    this.adresseService.updateAdress(this.data.adresse).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
