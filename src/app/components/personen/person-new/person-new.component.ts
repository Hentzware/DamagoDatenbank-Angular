import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Person} from "../../../core/entities/Person";
import {PersonService} from "../../../core/services/person.service";
import {AdresseService} from "../../../core/services/adresse.service";
import {PersonAdresseService} from "../../../core/services/person.adresse.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {MatDatepickerInput} from "@angular/material/datepicker";
import {concatMap} from "rxjs";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AutoCompleteComponent} from "../../auto-complete/auto-complete.component";

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
    MatDatepickerInput,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    NgForOf,
    AutoCompleteComponent
  ],
  templateUrl: './person-new.component.html',
  styleUrl: './person-new.component.css'
})
export class PersonNewComponent {
  public person: Person;
  public nachnamen: string[];
  public vornamen: string[];
  public geburtsdaten: string[];
  public strassen: string[];
  public hausnummern: string[];
  public postleitzahlen: string[];
  public orte: string[];
  public laender: string[];

  constructor(private personService: PersonService,
              private adresseService: AdresseService,
              private personAdresseService: PersonAdresseService,
              private dialogRef: MatDialogRef<PersonNewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.person = {
      id: "",
      geburtsdatum: "2000-01-01",
      vorname: "",
      nachname: "",
      adresse: {
        land: "",
        ort: "",
        postleitzahl: "",
        id: "",
        strasse: "",
        hausnummer: ""
      }
    };
    this.nachnamen = data?.nachnamen;
    this.vornamen = data?.vornamen;
    this.geburtsdaten = data?.geburtsdaten;
    this.strassen = data?.strassen;
    this.hausnummern = data?.hausnummern;
    this.postleitzahlen = data?.postleitzahlen;
    this.orte = data?.orte;
    this.laender = data?.laender;
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
    ).subscribe((): void => {
      this.dialogRef.close();
    });
  }

  public onNachnameSelected($event: string): void {
    this.person.nachname = $event;
  }

  public onVornameSelected($event: string): void {
    this.person.vorname = $event;
  }

  public onGeburtsdatumSelected($event: string): void {
    this.person.geburtsdatum = $event;
  }

  public onStrasseSelected($event: string): void {
    this.person.adresse.strasse = $event;
  }

  public onHausnummerSelected($event: string): void {
    this.person.adresse.hausnummer = $event;
  }

  public onPostleitzahlSelected($event: string): void {
    this.person.adresse.postleitzahl = $event;
  }

  public onOrtSelected($event: string): void {
    this.person.adresse.ort = $event;
  }

  public onLandSelected($event: string): void {
    this.person.adresse.land = $event;
  }
}
