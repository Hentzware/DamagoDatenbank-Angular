import {Component, OnInit} from '@angular/core';
import {Person} from "../../core/entities/Person";
import {PersonService} from "../../core/services/person.service";
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {CommonModule, DatePipe, NgClass} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {PersonNewComponent} from "./person-new/person-new.component";
import {Adresse} from "../../core/entities/Adresse";
import {AdresseService} from "../../core/services/adresse.service";
import {PersonAdresse} from "../../core/entities/PersonAdresse";
import {PersonAdresseService} from "../../core/services/person.adresse.service";
import {concatMap, tap} from "rxjs";
import {PersonEditComponent} from "./person-edit/person-edit.component";
import {PersonDeleteComponent} from "./person-delete/person-delete.component";
import {AutoComplete} from "../../core/entities/AutoComplete";
import {Rolle} from "../../core/entities/Rolle";
import {Standort} from "../../core/entities/Standort";
import {PersonStandort} from "../../core/entities/PersonStandort";
import {PersonRolle} from "../../core/entities/PersonRolle";
import {RolleService} from "../../core/services/rolle.service";
import {StandortService} from "../../core/services/standort.service";
import {PersonStandortService} from "../../core/services/person.standort.service";
import {PersonRolleService} from "../../core/services/person.rolle.service";
import {Klasse} from "../../core/entities/Klasse";
import {PersonKlasse} from "../../core/entities/PersonKlasse";
import {KlasseService} from "../../core/services/klasse.service";
import {PersonKlasseService} from "../../core/services/person.klasse.service";

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
    MatDialogModule
  ],
  templateUrl: './personen.component.html',
  styleUrl: './personen.component.css'
})
export class PersonenComponent implements OnInit {
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

  public ngOnInit(): void {
    this.getPersons();
  }

  public openDeletePersonDialog() {
    const dialogRef: MatDialogRef<PersonDeleteComponent> = this.dialog.open(PersonDeleteComponent, {
      width: "500px", data: {
        person: this.getSelectedPerson()
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPersons();
    });
  }

  public openEditPersonDialog() {
    const dialogRef: MatDialogRef<PersonEditComponent> = this.dialog.open(PersonEditComponent, {
      width: "500px",
      data: {
        person: this.getSelectedPerson(),
        personAutoComplete: this.autoComplete
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPersons();
    });
  }

  public openNewPersonDialog(): void {
    const dialogRef: MatDialogRef<PersonNewComponent> = this.dialog.open(PersonNewComponent, {
      width: "1000px",
      data: {
        personAutoComplete: this.autoComplete
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPersons();
    });
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
      concatMap(() =>
        this.adresseService.get().pipe(
          tap((adressenResult: Adresse[]) => {
            adressen = adressenResult;
          }),
        )
      ),
      concatMap(() =>
        this.personAdresseService.get().pipe(
          tap((personAdresseResult: PersonAdresse[]) => {
            personAdresse = personAdresseResult;
          }),
        )
      ),
      concatMap(() =>
        this.rolleService.get().pipe(
          tap((rollenResult: Rolle[]) => {
            rollen = rollenResult;
          }),
        )
      ),
      concatMap(() =>
        this.personRolleService.get().pipe(
          tap((personRolleResult: PersonRolle[]) => {
            personRolle = personRolleResult;
          }),
        )
      ),
      concatMap(() =>
        this.standortService.get().pipe(
          tap((standortResult: Standort[]) => {
            standort = standortResult;
          }),
        )
      ),
      concatMap(() =>
        this.personStandortService.get().pipe(
          tap((personStandortResult: PersonStandort[]) => {
            personStandort = personStandortResult;
          }),
        )
      ),
      concatMap(() =>
        this.klasseService.get().pipe(
          tap((klasseResult: Klasse[]) => {
            klasse = klasseResult;
          }),
        )
      ),
      concatMap(() =>
        this.personKlasseService.get().pipe(
          tap((personKlasseResult: PersonKlasse[]) => {
            personKlasse = personKlasseResult;
          }),
        )
      )
    ).subscribe(() => {
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
}
