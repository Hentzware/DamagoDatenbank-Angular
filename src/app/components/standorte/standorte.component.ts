import {Component, OnInit} from '@angular/core';
import {Standort} from "../../core/entities/Standort";
import {StandortService} from '../../core/services/standort.service';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgClass} from "@angular/common";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {StandortNewComponent} from "./standort-new/standort-new.component";
import {StandortDeleteComponent} from "./standort-delete/standort-delete.component";

@Component({
  selector: 'app-standorte',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatToolbarModule,
    MatButton,
    MatTableModule,
    MatDialogModule,
    NgClass
  ],
  templateUrl: './standorte.component.html',
  styleUrl: './standorte.component.css'
})
export class StandorteComponent implements OnInit {
  public standorte: MatTableDataSource<Standort> = new MatTableDataSource<Standort>();
  public selectedRowIndex: number = -1;
  public displayedColumns: string[] = ["id", "name"];

  constructor(private standortService: StandortService, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.getLocations();
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public getLocations(): void {
    this.standortService.get().subscribe(result => {
      this.standorte = new MatTableDataSource(result);
    });
  }

  public openNewLocationDialog(): void {
    const dialogRef: MatDialogRef<StandortNewComponent> = this.dialog.open(StandortNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getLocations();
    });
  }

  public openDeleteLocationDialog(): void {
    const dialogRef: MatDialogRef<StandortDeleteComponent> = this.dialog.open(StandortDeleteComponent, {
      width: "500px",
      data: { standort: this.standorte.data.filter(x => x.id != this.selectedRowIndex.toString()) }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getLocations();
    });
  }
}
