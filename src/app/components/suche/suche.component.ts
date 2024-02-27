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
import {concatMap, filter, tap} from "rxjs";

import {AutoComplete} from "../../core/entities/AutoComplete";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {Klasse} from "../../core/entities/Klasse";
import {Rolle} from "../../core/entities/Rolle";
import {Standort} from "../../core/entities/Standort";
import {RolleService} from "../../core/services/rolle.service";
import {PersonRolleService} from "../../core/services/person.rolle.service";
import {PersonRolle} from "../../core/entities/PersonRolle";

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
  public selectedClass: string = "";
  public selectedLocation: string = "";
  public selectedRole: string = "";
  public standorte!: Standort[];
  public displayedColumns: string[] = ["nachname", "vorname", "geburtsdatum","rolle", "strasse", "hausnummer", "postleitzahl", "ort", "land"];
  public personen: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  public selectedRowIndex: string = "-1";

  constructor( private rolleService: RolleService,
              private personService: PersonService,
              private adresseService: AdresseService,
              private personRolleService: PersonRolleService,
              private personAdresseService: PersonAdresseService,
              private dialog: MatDialog) {
    this.initializeRoles()

  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }




ngOnInit(): void {
    this.getPersons();

  }


  private getPersons(): void {
    this.selectedRowIndex = "-1";
    let adressen: Adresse[];
    let rollen: Rolle[];
    let personAdresse: PersonAdresse[];
    let personRolle: PersonRolle[];

    this.personService.get().pipe(tap((personenResult: Person[]) => {
      this.personen = new MatTableDataSource<Person>(personenResult);
    }), concatMap(() => {
      return this.adresseService.get().pipe(tap((adressenResult: Adresse[]) => {
        adressen = adressenResult;
      }), concatMap(() => {
        return this.personAdresseService.get().pipe(tap((personAdresseResult: PersonAdresse[]) => {
          personAdresse = personAdresseResult;
        }), concatMap(() => {
          return this.rolleService.get().pipe(tap((rollenResult: Rolle[]) => {
            rollen = rollenResult;
          }), concatMap(() => {
            return this.personRolleService.get().pipe(tap((personRolleResult: PersonRolle[]) => {
              personRolle = personRolleResult;
            }))
          }))
        }));
      }))
    })).subscribe((): void => {
      this.personen.data.map((person: Person) => {
        const personAdresseLink: PersonAdresse | undefined = personAdresse.find((link: PersonAdresse): boolean => link.person_id == person.id);
        const personRolleLink: PersonRolle | undefined = personRolle.find((link: PersonRolle): boolean => link.person_id == person.id);
        if (personAdresseLink && personRolleLink) {
          person.adresse = <Adresse>adressen.find((adresse: Adresse): boolean => adresse.id == personAdresseLink.adresse_id);
          person.rolle = <Rolle>rollen.find((rolle: Rolle): boolean => rolle.id == personRolleLink.rolle_id);
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
      data.rolle.name.trim().toLowerCase().includes(filter);
    this.personen.filter = filterValue.trim().toLowerCase();
  }

  private initializeRoles(): void {
    this.rolleService.get().subscribe(result => {
      this.rollen = result;
    });
  }
  }


