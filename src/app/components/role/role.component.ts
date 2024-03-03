import {Component, OnInit, ViewChild} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NgClass} from "@angular/common";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Role} from "../../core/entities/Role";
import {RoleService} from "../../core/services/role.service";
import {RoleNewComponent} from "./role-new/role-new.component";
import {RoleEditComponent} from "./role-edit/role-edit.component";
import {RoleDeleteComponent} from "./role-delete/role-delete.component";

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
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  public rollen: MatTableDataSource<Role> = new MatTableDataSource<Role>();
  public selectedRowIndex: string = "-1";
  public displayedColumns: string[] = ["id", "name"];

  constructor(private rolleService: RoleService,
              private dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer) {
  }

  public ngOnInit(): void {
    this.getRoles();
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public getRoles(): void {
    this.rolleService.get().subscribe(result => {
      this.rollen = new MatTableDataSource(result);
      this.rollen.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.rollen.sort = this.sort;
    });
  }

  public openNewRollDialog(): void {
    const dialogRef: MatDialogRef<RoleNewComponent> = this.dialog.open(RoleNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRoles();
    });
  }

  public openEditRollDialog(): void {
    const dialogRef: MatDialogRef<RoleEditComponent> = this.dialog.open(RoleEditComponent, {
      width: "500px",
      data: {rolle: this.getSelectedRoll()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRoles();
    });
  }

  public openDeleteRollDialog(): void {
    const dialogRef: MatDialogRef<RoleDeleteComponent> = this.dialog.open(RoleDeleteComponent, {
      width: "500px",
      data: {rolle: this.getSelectedRoll()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRoles();
    });
  }

  private getSelectedRoll(): any {
    return {...this.rollen.data.find(x => x.id == this.selectedRowIndex)};
  }

}
