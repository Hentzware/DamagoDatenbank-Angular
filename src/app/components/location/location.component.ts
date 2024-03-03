import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from "../../core/entities/Location";
import {LocationService} from '../../core/services/location.service';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgClass} from "@angular/common";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {LocationNewComponent} from "./location-new/location-new.component";
import {LocationDeleteComponent} from "./location-delete/location-delete.component";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {LocationEditComponent} from "./location-edit/location-edit.component";

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
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {
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
    const dialogRef: MatDialogRef<LocationNewComponent> = this.dialog.open(LocationNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getLocations();
    });
  }

  public openEditLocationDialog(): void {
    const dialogRef: MatDialogRef<LocationEditComponent> = this.dialog.open(LocationEditComponent, {
      width: "500px",
      data: { standort: this.getSelectedLocation() }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getLocations();
    });
  }

  public openDeleteLocationDialog(): void {
    const dialogRef: MatDialogRef<LocationDeleteComponent> = this.dialog.open(LocationDeleteComponent, {
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
