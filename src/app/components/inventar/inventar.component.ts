import {Component, ViewChild} from '@angular/core';
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {Standort} from "../../core/entities/Standort";
import {StandortService} from "../../core/services/standort.service";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {StandortNewComponent} from "../standorte/standort-new/standort-new.component";
import {StandortEditComponent} from "../standorte/standort-edit/standort-edit.component";
import {StandortDeleteComponent} from "../standorte/standort-delete/standort-delete.component";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatToolbar, MatToolbarModule, MatToolbarRow} from "@angular/material/toolbar";
import {Inventar} from "../../core/entities/Inventar";
import {InventarService} from "../../core/services/inventar.service";
import {InventarNewComponent} from "./inventar-new/inventar-new.component";
import {InventarEditComponent} from "./inventar-edit/inventar-edit.component";
import {InventarDeleteComponent} from "./inventar-delete/inventar-delete.component";
import {CommonModule, DatePipe, NgClass} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-inventar',
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
  templateUrl: './inventar.component.html',
  styleUrl: './inventar.component.css'
})
export class InventarComponent {
  @ViewChild(MatSort) sort: MatSort | any;
  public inventar: MatTableDataSource<Inventar> = new MatTableDataSource<Inventar>();
  public selectedRowIndex: string = "-1";
  public displayedColumns: string[] = ["id", "name", "anzahl"];

  constructor(private inventarService: InventarService,
              private dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer) {
  }

  public ngOnInit(): void {
    this.getInventory();
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public getInventory(): void {
    this.inventarService.get().subscribe(result => {
      this.inventar = new MatTableDataSource(result);
      this.inventar.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.inventar.sort = this.sort;
    });
  }

  public openNewInventoryDialog(): void {
    const dialogRef: MatDialogRef<InventarNewComponent> = this.dialog.open(InventarNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getInventory();
    });
  }

  public openEditInventoryDialog(): void {
    const dialogRef: MatDialogRef<InventarEditComponent> = this.dialog.open(InventarEditComponent, {
      width: "500px",
      data: { inventar: this.getSelectedInventory() }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getInventory();
    });
  }

  public openDeleteInventoryDialog(): void {
    const dialogRef: MatDialogRef<InventarDeleteComponent> = this.dialog.open(InventarDeleteComponent, {
      width: "500px",
      data: { inventar: this.getSelectedInventory() }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getInventory();
    });
  }

  private getSelectedInventory(): any {
    return {...this.inventar.data.find(x => x.id == this.selectedRowIndex)};
  }
}
