import {Component, OnInit} from '@angular/core';
import {Person} from "../../core/entities/Person";
import {PersonService} from "../../core/services/person.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {CommonModule, DatePipe, NgClass} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

import {Adresse} from "../../core/entities/Adresse";
import {AdresseService} from "../../core/services/adresse.service";
import {PersonAdresse} from "../../core/entities/PersonAdresse";
import {PersonAdresseService} from "../../core/services/person.adresse.service";
import {concatMap, tap} from "rxjs";

import {AutoComplete} from "../../core/entities/AutoComplete";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {Klasse} from "../../core/entities/Klasse";
import {Rolle} from "../../core/entities/Rolle";
import {Standort} from "../../core/entities/Standort";
import {RolleService} from "../../core/services/rolle.service";
import {PersonRolleService} from "../../core/services/person.rolle.service";
import {PersonRolle} from "../../core/entities/PersonRolle";
import {StandortService} from "../../core/services/standort.service";
import {PersonStandortService} from "../../core/services/person.standort.service";
import {PersonStandort} from "../../core/entities/PersonStandort";
import {KlasseService} from "../../core/services/klasse.service";
import {PersonKlasseService} from "../../core/services/person.klasse.service";
import {PersonKlasse} from "../../core/entities/PersonKlasse";

@Component({
  selector: 'app-personen',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatTableModule,
    DatePipe,
    NgClass,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule,
    MatInput,
    MatButton,
    MatToolbar,
    MatToolbarModule,
    MatDialogModule,
    MatTab,
    MatTabGroup
  ],
  templateUrl: './suche.component.html',
  styleUrl: './suche.component.css'
})
export class SucheComponent implements OnInit {
  public klassen!: Klasse[];
  data: any;
  public person!: Person;
  public rollen!: Rolle[];
  public klasse!: Klasse[];
  public selectedClass: string = "";
  public selectedLocation: string = "";
  public selectedRole: string = "";
  public standorte!: Standort[];
  public displayedColumns: string[] = ["nachname", "vorname", "geburtsdatum", "rolle","standort","klasse", "strasse", "hausnummer", "postleitzahl", "ort", "land"];
  public personen: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  public selectedRowIndex: string = "-1";

  constructor(private rolleService: RolleService,
              private standortService: StandortService,
              private personStandortService: PersonStandortService,
              private personService: PersonService,
              private klasseService: KlasseService,
              private personKlasseService: PersonKlasseService,
              private adresseService: AdresseService,
              private personRolleService: PersonRolleService,
              private personAdresseService: PersonAdresseService,
              private dialog: MatDialog) {

  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }


  ngOnInit(): void {
    this.getPersons();
    this.initializeRoles();
    this.initializeLocations();
    this.initializeClasses();




  }


  private getPersons(): void {
    this.selectedRowIndex = "-1";
    let adressen: Adresse[];
    let rollen: Rolle[];
    let standort: Standort[];
    let klasse: Klasse[];
    let personStandort: PersonStandort[];
    let personAdresse: PersonAdresse[];
    let personRolle: PersonRolle[];
    let personKlasse: PersonKlasse[];

    this.personService.get().pipe(
      tap((personenResult: Person[]) => {
        this.personen = new MatTableDataSource<Person>(personenResult);
      }),
      concatMap(() => this.adresseService.get().pipe(
        tap((adressenResult: Adresse[]) => {
          adressen = adressenResult;
        })
      )),
      concatMap(() => this.personAdresseService.get().pipe(
        tap((personAdresseResult: PersonAdresse[]) => {
          personAdresse = personAdresseResult;
        })
      )),
      concatMap(() => this.rolleService.get().pipe(
        tap((rollenResult: Rolle[]) => {
          rollen = rollenResult;
        })
      )),
      concatMap(() => this.personRolleService.get().pipe(
        tap((personRolleResult: PersonRolle[]) => {
          personRolle = personRolleResult;
        })
      )),
      concatMap(() => this.standortService.get().pipe(
        tap((standortResult: Standort[]) => {
          standort = standortResult;
        })
      )),
      concatMap(() => this.personStandortService.get().pipe(
        tap((personStandortResult: PersonStandort[]) => {
          personStandort = personStandortResult;
        })
      )),
      concatMap(() => this.klasseService.get().pipe(
        tap((klasseResult: Klasse[]) => {
          klasse = klasseResult;
        })
      )),
      concatMap(() => this.personKlasseService.get().pipe(
        tap((personKlasseResult: PersonKlasse[]) => {
          personKlasse = personKlasseResult;
        })
      ))
    ).subscribe(() => {
      // unten ist Ihr bereits vorhandener Code
      this.personen.data.map((person: Person) => {
        const personAdresseLink: PersonAdresse | undefined = personAdresse.find((link: PersonAdresse): boolean => link.person_id == person.id);
        const personRolleLink: PersonRolle | undefined = personRolle.find((link: PersonRolle): boolean => link.person_id == person.id);
        const personStandortLink: PersonStandort | undefined = personStandort.find((link: PersonStandort): boolean => link.person_id == person.id);
        const personKlasseLink: PersonKlasse | undefined = personKlasse.find((link: PersonKlasse): boolean => link.person_id == person.id);

        if (personAdresseLink) {
          person.adresse = <Adresse>adressen.find((adresse: Adresse): boolean => adresse.id == personAdresseLink.adresse_id);
        }
        if (personRolleLink) {
          person.rolle = <Rolle>rollen.find((rolle: Rolle): boolean => rolle.id == personRolleLink.rolle_id);
        }
        if (personStandortLink) {
          person.standort = <Standort>standort.find((standort: Standort): boolean => standort.id === personStandortLink.standort_id);
        }
        if (personKlasseLink) {
          person.klasse = <Klasse>klasse.find((klasse: Klasse): boolean => klasse.id === personKlasseLink.klasse_id);
        }

        return person;
      });
    });
  }
  private getSelectedPerson(): any {
    return {...this.personen.data.find((x: Person): boolean => x.id == this.selectedRowIndex)};
  }

  applyFilterVorname(filterValue: string) {
    this.personen.filterPredicate = (data, filter) =>
      data.vorname.trim().toLowerCase().includes(filter);
    this.personen.filter = filterValue.trim().toLowerCase();
  }

  applyFilterNachname(filterValue: string) {
    this.personen.filterPredicate = (data, filter) =>
      data.nachname.trim().toLowerCase().includes(filter);
    this.personen.filter = filterValue.trim().toLowerCase();
  }

  applyFilterRollen(filterValue: string) {
    this.personen.filterPredicate = (data, filter) =>
      data.rolle && data.rolle.name.trim().toLowerCase().includes(filter);
    this.personen.filter = filterValue.trim().toLowerCase();
  }

  applyFilterLocation(filterValue: string) {
    this.personen.filterPredicate = (data, filter) =>
      data.standort && data.standort.name.trim().toLowerCase().includes(filter);
    this.personen.filter = filterValue.trim().toLowerCase();
  }
  applyFilterClass(filterValue: string) {
    this.personen.filterPredicate = (data, filter) =>
      data.klasse && data.klasse.name.trim().toLowerCase().includes(filter);
    this.personen.filter = filterValue.trim().toLowerCase();
  }


  private initializeClasses(): void {
    this.klasseService.get().subscribe(result => {
     console.log(result)
      this.klasse = result;
      console.log(this.personen);
    });
  }

  private initializeRoles(): void {
    this.rolleService.get().subscribe(result => {
      this.rollen = result;
    });

  }


  private initializeLocations(): void {
    this.standortService.get().subscribe(result => {
      this.standorte = result;
    });
  }

}


