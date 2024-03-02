import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatTable,
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Room} from "../../core/entities/Room";
import {RoomService} from "../../core/services/room.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule, DatePipe, NgClass} from "@angular/common";
import {RaeumeEditComponent} from "./raeume-edit/raeume-edit.component";
import {RaeumeNewComponent} from "./raeume-new/raeume-new.component";
import {RaeumeDeleteComponent} from "./raeume-delete/raeume-delete.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-raeume',
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
  templateUrl: './raeume.component.html',
  styleUrl: './raeume.component.css'
})
export class RaeumeComponent implements OnInit{
  @ViewChild(MatSort) sort: MatSort | any;
  public raum: MatTableDataSource<Room> = new MatTableDataSource<Room>();
  public selectedRowIndex: string = "-1";
  public displayedColumns: string[] = ["id", "name", "nr"];

  constructor(private raumService: RoomService,
              private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.getRoom();
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public getRoom(): void {
    this.raumService.get().subscribe(result => {
      this.raum = new MatTableDataSource(result);
      this.raum.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.raum.sort = this.sort;
    });
  }

  public openNewRoomDialog(): void {
    const dialogRef: MatDialogRef<RaeumeNewComponent> = this.dialog.open(RaeumeNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRoom();
    });
  }

  public openEditRoomDialog(): void {
    const dialogRef: MatDialogRef<RaeumeEditComponent> = this.dialog.open(RaeumeEditComponent, {
      width: "500px",
      data: { raum: this.getSelectedRoom() }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRoom();
    });
  }

  public openDeleteRoomDialog(): void {
    const dialogRef: MatDialogRef<RaeumeDeleteComponent> = this.dialog.open(RaeumeDeleteComponent, {
      width: "500px",
      data: { raum: this.getSelectedRoom() }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRoom();
    });
  }

  private getSelectedRoom(): any {
    return {...this.raum.data.find(x => x.id == this.selectedRowIndex)};
  }
}

