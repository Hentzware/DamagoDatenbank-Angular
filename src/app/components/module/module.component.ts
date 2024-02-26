import {Component, OnInit, ViewChild} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {NgClass} from "@angular/common";
import {Modul} from "../../core/entities/Modul";
import {ModulService} from "../../core/services/modul.service";
import {ModuleNewComponent} from "./module-new/module-new.component";
import {ModuleEditComponent} from "./module-edit/module-edit.component";
import {ModuleDeleteComponent} from "./module-delete/module-delete.component";

@Component({
  selector: 'app-module',
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
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  public module: MatTableDataSource<Modul> = new MatTableDataSource<Modul>();
  public selectedRowIndex: string = "-1";
  public displayedColumns: string[] = ["id", "name", "beschreibung"];

  constructor(private modulService: ModulService,
              private dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer) {
  }

  public ngOnInit(): void {
    this.getModules();
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public getModules(): void {
    this.modulService.get().subscribe(result => {
      this.module = new MatTableDataSource(result);
      this.module.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.module.sort = this.sort;
    });
  }

  public openNewModuleDialog(): void {
    const dialogRef: MatDialogRef<ModuleNewComponent> = this.dialog.open(ModuleNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getModules();
    });
  }

  public openEditModuleDialog(): void {
    const dialogRef: MatDialogRef<ModuleEditComponent> = this.dialog.open(ModuleEditComponent, {
      width: "500px",
      data: {modul: this.getSelectedModule()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getModules();
    });
  }

  public openDeleteModuleDialog(): void {
    const dialogRef: MatDialogRef<ModuleDeleteComponent> = this.dialog.open(ModuleDeleteComponent, {
      width: "500px",
      data: {modul: this.getSelectedModule()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getModules();
    });
  }

  private getSelectedModule(): any {
    return {...this.module.data.find(x => x.id == this.selectedRowIndex)};
  }

}
