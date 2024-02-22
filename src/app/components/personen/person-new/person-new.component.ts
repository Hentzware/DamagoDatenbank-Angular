import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Person} from "../../../core/entities/Person";
import {PersonService} from "../../../core/services/person.service";
import {AdresseService} from "../../../core/services/adresse.service";
import {PersonAdresseService} from "../../../core/services/person.adresse.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {MatDatepickerInput} from "@angular/material/datepicker";
import {AddPersonRequest} from "../../../core/requests/person/add-person-request";
import {Adresse} from "../../../core/entities/Adresse";
import {concatMap} from "rxjs";

@Component({
  selector: 'app-person-new',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    DatePipe,
    MatDatepickerInput
  ],
  templateUrl: './person-new.component.html',
  styleUrl: './person-new.component.css'
})
export class PersonNewComponent {
  public person: Person;

  constructor(private personService: PersonService,
              private adresseService: AdresseService,
              private personAdresseService: PersonAdresseService,
              private dialogRef: MatDialogRef<PersonNewComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.person = {
      id: "",
      geburtsdatum: "2000-01-01",
      vorname: "test",
      nachname: "test",
      adresse: {
        land: "test",
        ort: "test",
        postleitzahl: "test",
        id: "",
        strasse: "test",
        hausnummer: "test"
      }
    };
  }

  public save(): void {
    this.personService.add(this.person).pipe(
      concatMap((person: any) => {
        return this.adresseService.add(this.person.adresse).pipe(
          concatMap((adresse: any) => {
            return this.personAdresseService.add({id: "", person_id: person.id, adresse_id: adresse.id});
          })
        );
      })
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
