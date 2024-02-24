import {Component, Inject, OnInit} from '@angular/core';
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
import {RolleService} from "../../../core/services/rolle.service";
import {StandortService} from "../../../core/services/standort.service";
import {KlasseService} from "../../../core/services/klasse.service";
import {MatSelect} from "@angular/material/select";
import {Standort} from "../../../core/entities/Standort";
import {Rolle} from "../../../core/entities/Rolle";
import {Klasse} from "../../../core/entities/Klasse";

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
    AutoCompleteComponent,
    MatSelect
  ],
  templateUrl: './person-new.component.html',
  styleUrl: './person-new.component.css'
})
export class PersonNewComponent implements OnInit {
  public person!: Person;
  public standorte!: Standort[];
  public rollen!: Rolle[];
  public klassen!: Klasse[];

  constructor(private personService: PersonService,
              private adresseService: AdresseService,
              private personAdresseService: PersonAdresseService,
              private rolleService: RolleService,
              private standortService: StandortService,
              private klasseService: KlasseService,
              private dialogRef: MatDialogRef<PersonNewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
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
    this.initializeStandorte();
    this.initializeRollen();
    this.initializeKlassen();
  }

  private initializeStandorte(): void {
    this.standortService.get().subscribe(result => {
      this.standorte = result;
    });
  }

  private initializeRollen(): void {
    this.rolleService.get().subscribe(result => {
      this.rollen = result;
    });
  }

  private initializeKlassen(): void {
    this.klasseService.get().subscribe(result => {
      this.klassen = result;
    });
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
}
