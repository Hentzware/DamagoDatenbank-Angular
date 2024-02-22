import {Component, OnInit, ViewChild} from '@angular/core';
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
import {Adresse} from "../../core/entities/Adresse";
import {AdresseService} from "../../core/services/adresse.service";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {AdresseNewComponent} from "./adresse-new/adresse-new.component";
import {AdresseEditComponent} from "./adresse-edit/adresse-edit.component";
import {AdresseDeleteComponent} from "./adresse-delete/adresse-delete.component";

@Component({
  selector: 'app-adresse',
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
    MatSort,
    MatSortHeader
  ],
  templateUrl: './adresse.component.html',
  styleUrl: './adresse.component.css'
})
export class AdresseComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  public adresse: MatTableDataSource<Adresse> = new MatTableDataSource<Adresse>();
  public selectedRowIndex: string = "-1";
  public displayedColumns: string[] = ["id", "strasse", "hausnummer", "postleitzahl", "ort", "land"]

  constructor(private adresseService: AdresseService, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.getAddresses();
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public getAddresses(): void {
    this.adresseService.get().subscribe(result => {
      this.adresse = new MatTableDataSource(result);
      this.adresse.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.adresse.sort = this.sort;
    });
  }

  public openNewAddressDialog(): void {
    const dialogRef: MatDialogRef<AdresseNewComponent> = this.dialog.open(AdresseNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAddresses();
    });
  }

  public openEditAddressDialog(): void {
    const dialogRef: MatDialogRef<AdresseEditComponent> = this.dialog.open(AdresseEditComponent, {
      width: "500px",
      data: {adresse: this.getSelectedAddress()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAddresses();
    });
  }

  public openDeleteAddressDialog(): void {
    const dialogRef: MatDialogRef<AdresseDeleteComponent> = this.dialog.open(AdresseDeleteComponent, {
      width: "500px",
      data: {adresse: this.getSelectedAddress()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAddresses();
    });
  }

  private getSelectedAddress(): any {
    return {...this.adresse.data.find(x => x.id == this.selectedRowIndex)};
  }
}
