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
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {PersonNewComponent} from "./person-new/person-new.component";
import {Adresse} from "../../core/entities/Adresse";
import {AdresseService} from "../../core/services/adresse.service";
import {PersonAdresse} from "../../core/entities/PersonAdresse";
import {PersonAdresseService} from "../../core/services/person.adresse.service";
import {concatMap, tap} from "rxjs";
import {PersonEditComponent} from "./person-edit/person-edit.component";
import {PersonDeleteComponent} from "./person-delete/person-delete.component";

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
  personen: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  selectedRowIndex: string = "-1";
  displayedColumns: string[] = ["nachname", "vorname", "geburtsdatum", "strasse", "hausnummer", "postleitzahl", "ort", "land"];
  nachnamen: string[] = [];

  constructor(private personService: PersonService,
              private adresseService: AdresseService,
              private personAdresseService: PersonAdresseService,
              private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.getPersons();
  }

  public highlight(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public openNewPersonDialog(): void {
    const dialogRef: MatDialogRef<PersonNewComponent> = this.dialog.open(PersonNewComponent, {
      width: "500px",
      data:{nachnamen:this.nachnamen}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPersons();
    });
  }

  private getPersons(): void {
    let adressen: Adresse[];
    let personAdresse: PersonAdresse[];

    this.personService.get().pipe(
      tap(personenResult => {
        this.personen = new MatTableDataSource<Person>(personenResult);
      }),
      concatMap(() => {
        return this.adresseService.get().pipe(
          tap(adressenResult => {
            adressen = adressenResult;
          }),
          concatMap(() => {
            return this.personAdresseService.get().pipe(
              tap(personAdresseResult => {
                personAdresse = personAdresseResult;
              })
            );
          })
        )
      })
    ).subscribe(() => {
      this.personen.data.map(person => {
        const personAdresseLink = personAdresse.find(link => link.person_id == person.id);

        if (personAdresseLink) {
          person.adresse = <Adresse>adressen.find(adresse => adresse.id == personAdresseLink.adresse_id);
        }

        return person;
      });

      this.nachnamen = this.personen.data.map<string>(x => {
        return x.nachname;
      });

    });
  }

  openEditPersonDialog() {
    const dialogRef: MatDialogRef<PersonEditComponent> = this.dialog.open(PersonEditComponent, {
      width: "500px",
      data: { person: this.getSelectedPerson() }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPersons();
    });
  }

  getSelectedPerson(): any {
        return {...this.personen.data.find(x => x.id == this.selectedRowIndex)};
    }

  openDeletePersonDialog() {
    const dialogRef: MatDialogRef<PersonDeleteComponent> = this.dialog.open(PersonDeleteComponent, {
      width: "500px",
      data: { person: this.getSelectedPerson() }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPersons();
    });
  }
}
