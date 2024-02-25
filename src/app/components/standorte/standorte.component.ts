import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from "../../core/entities/Location";
import {LocationService} from '../../core/services/location.service';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgClass} from "@angular/common";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {StandortNewComponent} from "./standort-new/standort-new.component";
import {StandortDeleteComponent} from "./standort-delete/standort-delete.component";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {StandortEditComponent} from "./standort-edit/standort-edit.component";

@Component({
  selector: 'app-standorte',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatToolbarModule,
    MatButton,
    MatTableModule,
    MatDialogModule,
    NgClass,
    MatSortHeader,
    MatSort,
    MatSortModule
  ],
  templateUrl: './standorte.component.html',
  styleUrl: './standorte.component.css'
})
export class StandorteComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  public standorte: MatTableDataSource<Location> = new MatTableDataSource<Location>();
  public selectedRowIndex: string = "-1";
  public displayedColumns: string[] = ["id", "name"];

  constructor(private standortService: LocationService,
              private dialog: MatDialog) {
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
      this.standorte.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.standorte.sort = this.sort;
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

  public openEditLocationDialog(): void {
    const dialogRef: MatDialogRef<StandortEditComponent> = this.dialog.open(StandortEditComponent, {
      width: "500px",
      data: { standort: this.getSelectedLocation() }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getLocations();
    });
  }

  public openDeleteLocationDialog(): void {
    const dialogRef: MatDialogRef<StandortDeleteComponent> = this.dialog.open(StandortDeleteComponent, {
      width: "500px",
      data: { standort: this.getSelectedLocation() }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getLocations();
    });
  }

  private getSelectedLocation(): any {
    return {...this.standorte.data.find(x => x.id == this.selectedRowIndex)};
  }
}
