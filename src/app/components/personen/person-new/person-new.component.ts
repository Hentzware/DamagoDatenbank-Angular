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
import {PersonStandortService} from "../../../core/services/person.standort.service";
import {PersonStandort} from "../../../core/entities/PersonStandort";
import {PersonRolleService} from "../../../core/services/person.rolle.service";

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
  public klassen!: Klasse[];
  public person!: Person;
  public rollen!: Rolle[];
  public selectedClass: string = "";
  public selectedLocation: string = "";
  public selectedRole: string = "";
  public standorte!: Standort[];

  constructor(private personService: PersonService,
              private adresseService: AdresseService,
              private personRolleService: PersonRolleService,
              private personAdresseService: PersonAdresseService,
              private rolleService: RolleService,
              private standortService: StandortService,
              private klasseService: KlasseService,
              private personStandortService: PersonStandortService,
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
      },
      rolle : {
        name: "",
        id: ""
      }

    };
    this.initializeLocations();
    this.initializeRoles();
    this.initializeClasses();
    this.getPersonStandort();

  }

  public onPersonBirthdaySelected($event: string): void {
    this.person.geburtsdatum = $event;
  }

  public onPersonCountrySelected($event: string): void {
    this.person.adresse.land = $event;
  }

  public onPersonFirstNameSelected($event: string): void {
    this.person.vorname = $event;
  }

  public onPersonHouseNumberSelected($event: string): void {
    this.person.adresse.hausnummer = $event;
  }

  public onPersonLastNameSelected($event: string): void {
    this.person.nachname = $event;
  }

  public onPersonLocationSelected($event: string): void {
    this.person.adresse.ort = $event;
  }

  public onPersonPostalCodeSelected($event: string): void {
    this.person.adresse.postleitzahl = $event;
  }

  public onPersonStreetSelected($event: string): void {
    this.person.adresse.strasse = $event;
  }

  public onSelectedClassChanged($event: string): void {
    this.selectedClass = $event;
  }

  public onSelectedLocationChanged($event: string): void {
    this.selectedLocation = $event;
    console.log($event);
  }

  public onSelectedRoleChanged($event: string): void {
    this.selectedRole = $event;
    console.log($event);

  }

  public save(): void {


    this.personService.add(this.person).pipe(
      concatMap((person: any) => {
        return this.adresseService.add(this.person.adresse).pipe(
          concatMap((adresse: any) => {
            return this.personAdresseService.add({id: "", person_id: person.id, adresse_id: adresse.id}).pipe(
              concatMap((rolle: any)=> {
                return this.personRolleService.add({id: "", person_id: person.id, rolle_id: this.selectedRole})
              }
            ));
          })
        );
      })
    ).subscribe((): void => {
      this.dialogRef.close();
    });

  }

  private getPersonStandort(): void {
    let ps: PersonStandort = {
      id: "",
      person_id: "12345",
      standort_id: "67890"
    };
    this.personStandortService.add(ps).subscribe(() => {
      this.personStandortService.get().subscribe(result => {
        console.log(result);
      });
    })
  }

  private initializeClasses(): void {
    this.klasseService.get().subscribe(result => {
      this.klassen = result;
    });
  }

  private initializeLocations(): void {
    this.standortService.get().subscribe(result => {
      this.standorte = result;
    });
  }

  private initializeRoles(): void {
    this.rolleService.get().subscribe(result => {
      this.rollen = result;
    });
  }
}
