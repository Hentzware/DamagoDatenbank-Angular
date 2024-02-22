import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AdresseComponent} from "../adresse.component";
import {Adresse} from "../../../core/entities/Adresse";
import {AdresseService} from "../../../core/services/adresse.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-adresse-new',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './adresse-new.component.html',
  styleUrl: './adresse-new.component.css'
})
export class AdresseNewComponent {
  public adresse: Adresse = {id:"",strasse:"",hausnummer:"",postleitzahl:"",ort:"",land:""}

  constructor(private adresseService: AdresseService,
              private dialogRef: MatDialogRef<AdresseNewComponent>){

  }
  public createNewAdress(): void {
    this.adresseService.add(this.adresse).subscribe(() =>{
      this.dialogRef.close();
    })
  }

}
