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
  public displayedColumns: string[] = ["nachname", "vorname", "geburtsdatum", "strasse", "hausnummer", "postleitzahl", "ort", "land"];
  public autoComplete: AutoComplete = {
    orte: [],
    laender: [],
    strassen: [],
    vornamen: [],
    hausnummern: [],
    postleitzahlen: [],
    geburtsdaten: [],
    nachnamen: []
  };
  public personen: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  public selectedRowIndex: string = "-1";

  constructor(private personService: PersonService,
              private adresseService: AdresseService,
              private personAdresseService: PersonAdresseService,
              private dialog: MatDialog) {
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public ngOnInit(): void {
    this.getPersons();
  }


  private getPersons(): void {
    this.selectedRowIndex = "-1";
    let adressen: Adresse[];
    let personAdresse: PersonAdresse[];

    this.personService.get().pipe(tap((personenResult: Person[]) => {
      this.personen = new MatTableDataSource<Person>(personenResult);
    }), concatMap(() => {
      return this.adresseService.get().pipe(tap((adressenResult: Adresse[]) => {
        adressen = adressenResult;
      }), concatMap(() => {
        return this.personAdresseService.get().pipe(tap((personAdresseResult: PersonAdresse[]) => {
          personAdresse = personAdresseResult;
        }));
      }))
    })).subscribe((): void => {
      this.personen.data.map((person: Person) => {
        const personAdresseLink: PersonAdresse | undefined = personAdresse.find((link: PersonAdresse): boolean => link.person_id == person.id);

        if (personAdresseLink) {
          person.adresse = <Adresse>adressen.find((adresse: Adresse): boolean => adresse.id == personAdresseLink.adresse_id);
        }

        return person;
      });

      this.initializePersonAutoCompleteData();
    });
  }

  private getSelectedPerson(): any {
    return {...this.personen.data.find((x: Person): boolean => x.id == this.selectedRowIndex)};
  }


  private initializePersonAutoCompleteData(): void {
    this.autoComplete.nachnamen = Array.from(new Set(this.personen.data.map<string>((x: Person) => {
      return x?.nachname;
    })));

    this.autoComplete.vornamen = Array.from(new Set(this.personen.data.map<string>((x: Person) => {
      return x?.vorname;
    })));

    this.autoComplete.geburtsdaten = Array.from(new Set(this.personen.data.map<string>((x: Person) => {
      return x?.geburtsdatum;
    })));

    this.autoComplete.strassen = Array.from(new Set(this.personen.data.map<string>((x: Person) => {
      return x.adresse?.strasse;
    })));

    this.autoComplete.hausnummern = Array.from(new Set(this.personen.data.map<string>((x: Person) => {
      return x.adresse?.hausnummer;
    })));

    this.autoComplete.postleitzahlen = Array.from(new Set(this.personen.data.map<string>((x: Person) => {
      return x.adresse?.postleitzahl;
    })));

    this.autoComplete.orte = Array.from(new Set(this.personen.data.map<string>((x: Person) => {
      return x.adresse?.ort;
    })));

    this.autoComplete.laender = Array.from(new Set(this.personen.data.map<string>((x: Person) => {
      return x.adresse?.land;
    })));
  }

  applyFilter(value: string) {
    this.personen.filter = value.trim().toLowerCase();
  }
}
