import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Person} from "../../../core/entities/Person";
import {PersonService} from "../../../core/services/person.service";
import {AdresseService} from "../../../core/services/adresse.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {concatMap} from "rxjs";
import {AutoCompleteComponent} from "../../auto-complete/auto-complete.component";

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteComponent
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css'
})
export class PersonEditComponent {
  public person: Person = {
    id: "",
    adresse: {
      land: "",
      ort: "",
      strasse: "",
      hausnummer: "",
      postleitzahl: "",
      id: ""
    },
    rolle: {
      name:"",
      id: ""
    },
    standort:{
      name:"",
      id:""
    },
    vorname: "",
    nachname: "",
    geburtsdatum: ""
  };

  constructor(private personService: PersonService,
              private adresseService: AdresseService,
              private dialogRef: MatDialogRef<PersonEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.person) {
      if (data.person.adresse) {
        this.person = data.person;
      } else {
        this.person = {...data.person, adresse: this.person.adresse};
      }
    }
  }

  public onGeburtsdatumSelected($event: string): void {
    this.person.geburtsdatum = $event;
  }

  public onHausnummerSelected($event: string): void {
    this.person.adresse.hausnummer = $event;
  }

  public onLandSelected($event: string): void {
    this.person.adresse.land = $event;
  }

  public onNachnameSelected($event: string): void {
    this.person.nachname = $event;
  }

  public onOrtSelected($event: string): void {
    this.person.adresse.ort = $event;
  }

  public onPostleitzahlSelected($event: string): void {
    this.person.adresse.postleitzahl = $event;
  }

  public onStrasseSelected($event: string): void {
    this.person.adresse.strasse = $event;
  }

  public onVornameSelected($event: string): void {
    this.person.vorname = $event;
  }


  public save(): void {
    this.personService.update(this.person).pipe(
      concatMap(() => {
        return this.adresseService.update(this.person.adresse);
      })
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }


/*  onClassSelected($event: string) {
    this.person.klasse.name = $event;
  }
  */

}
