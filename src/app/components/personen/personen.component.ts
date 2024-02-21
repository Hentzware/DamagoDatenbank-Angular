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
import {PersonSearchComponent} from "./person-search/person-search.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

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
  personen: Person[] = [];
  selectedRowIndex: number = -1;
  displayedColumns: string[] = ["id", "nachname", "vorname", "geburtsdatum"];

  constructor(private personService: PersonService, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.getPersons();
  }

  private getPersons(): void {
    this.personService.getPersons().subscribe(result => {
      this.personen = result;
    });
  }

  public highlight(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(PersonSearchComponent, {
      width: "500px",
      height: "500px",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed")
    });
  }
}
