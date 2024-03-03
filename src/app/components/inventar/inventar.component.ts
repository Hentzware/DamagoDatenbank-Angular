import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {Inventory} from "../../core/entities/Inventory";
import {InventoryService} from "../../core/services/inventory.service";
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
  imports: [MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef, MatTableModule, DatePipe, NgClass, MatFormFieldModule, MatSelectModule, MatOptionModule, FormsModule, FlexLayoutModule, CommonModule, MatInput, MatButton, MatToolbar, MatToolbarModule, MatDialogModule, MatSort, MatSortHeader],
  templateUrl: './inventar.component.html',
  styleUrl: './inventar.component.css'
})
export class InventarComponent implements OnInit {
  public displayedColumns: string[] = ["id", "name", "anzahl"];
  public inventory: MatTableDataSource<Inventory> = new MatTableDataSource<Inventory>();
  public selectedRowIndex: string = "-1";
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private inventoryService: InventoryService, private dialog: MatDialog) {
  }

  public getInventory(): void {
    this.inventoryService.get().subscribe(result => {
      this.inventory = new MatTableDataSource(result);
      this.inventory.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.inventory.sort = this.sort;
    });
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public ngOnInit(): void {
    this.getInventory();
  }

  public openDeleteDialog(): void {
    const dialogRef: MatDialogRef<InventarDeleteComponent> = this.dialog.open(InventarDeleteComponent, {
      width: "500px", data: {inventory: this.getSelectedInventory()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getInventory();
    });
  }

  public openEditDialog(): void {
    const dialogRef: MatDialogRef<InventarEditComponent> = this.dialog.open(InventarEditComponent, {
      width: "500px", data: {inventory: this.getSelectedInventory()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getInventory();
    });
  }

  public openNewDialog(): void {
    const dialogRef: MatDialogRef<InventarNewComponent> = this.dialog.open(InventarNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getInventory();
    });
  }

  private getSelectedInventory(): any {
    return {...this.inventory.data.find(x => x.id == this.selectedRowIndex)};
  }
}
