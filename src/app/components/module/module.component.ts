import {Component, OnInit, ViewChild} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NgClass} from "@angular/common";
import {Module} from "../../core/entities/Module";
import {ModuleService} from "../../core/services/module.service";
import {ModuleNewComponent} from "./module-new/module-new.component";
import {ModuleEditComponent} from "./module-edit/module-edit.component";
import {ModuleDeleteComponent} from "./module-delete/module-delete.component";

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [FlexLayoutModule, MatToolbarModule, MatButton, MatTableModule, MatDialogModule, NgClass, MatSortHeader, MatSort, MatSortModule],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent implements OnInit {
  public displayedColumns: string[] = ["name", "beschreibung"];
  public modules: MatTableDataSource<Module> = new MatTableDataSource<Module>();
  public selectedRowIndex: string = "-1";
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private moduleService: ModuleService, private dialog: MatDialog) {
  }

  public getModules(): void {
    this.moduleService.get().subscribe(result => {
      console.log(result);
      this.modules = new MatTableDataSource(result);
      this.modules.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.modules.sort = this.sort;
    });
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public ngOnInit(): void {
    this.getModules();
  }

  public openDeleteDialog(): void {
    const dialogRef: MatDialogRef<ModuleDeleteComponent> = this.dialog.open(ModuleDeleteComponent, {
      width: "500px", data: {module: this.getSelectedModule()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getModules();
    });
  }

  public openEditDialog(): void {
    const dialogRef: MatDialogRef<ModuleEditComponent> = this.dialog.open(ModuleEditComponent, {
      width: "500px", data: {module: this.getSelectedModule()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getModules();
    });
  }

  public openNewDialog(): void {
    const dialogRef: MatDialogRef<ModuleNewComponent> = this.dialog.open(ModuleNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getModules();
    });
  }

  private getSelectedModule(): any {
    return {...this.modules.data.find(x => x.id == this.selectedRowIndex)};
  }

}
