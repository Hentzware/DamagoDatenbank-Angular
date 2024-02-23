import {Component, OnInit, ViewChild} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NgClass} from "@angular/common";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Rolle} from "../../core/entities/Rolle";
import {RolleService} from "../../core/services/rolle.service";
import {RollenNewComponent} from "./rollen-new/rollen-new.component";
import {RollenEditComponent} from "./rollen-edit/rollen-edit.component";
import {RollenDeleteComponent} from "./rollen-delete/rollen-delete.component";

@Component({
  selector: 'app-rollen',
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
  templateUrl: './rollen.component.html',
  styleUrl: './rollen.component.css'
})
export class RollenComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  public rollen: MatTableDataSource<Rolle> = new MatTableDataSource<Rolle>();
  public selectedRowIndex: string = "-1";
  public displayedColumns: string[] = ["id", "name"];

  constructor(private rolleService: RolleService,
              private dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer) {
  }

  public ngOnInit(): void {
    this.getRolls();
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public getRolls(): void {
    this.rolleService.get().subscribe(result => {
      this.rollen = new MatTableDataSource(result);
      this.rollen.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.rollen.sort = this.sort;
    });
  }

  public openNewRollDialog(): void {
    const dialogRef: MatDialogRef<RollenNewComponent> = this.dialog.open(RollenNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRolls();
    });
  }

  public openEditRollDialog(): void {
    const dialogRef: MatDialogRef<RollenEditComponent> = this.dialog.open(RollenEditComponent, {
      width: "500px",
      data: {rolle: this.getSelectedRoll()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRolls();
    });
  }

  public openDeleteRollDialog(): void {
    const dialogRef: MatDialogRef<RollenDeleteComponent> = this.dialog.open(RollenDeleteComponent, {
      width: "500px",
      data: {rolle: this.getSelectedRoll()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRolls();
    });
  }

  private getSelectedRoll(): any {
    return {...this.rollen.data.find(x => x.id == this.selectedRowIndex)};
  }

}
