import {Component, ViewChild} from '@angular/core';
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {Address} from "../../core/entities/Address";
import {AddressService} from "../../core/services/address.service";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule, DatePipe, NgClass} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {AddressNewComponent} from "./address-new/address-new.component";
import {AddressEditComponent} from "./address-edit/address-edit.component";
import {AddressDeleteComponent} from "./address-delete/address-delete.component";

@Component({
  selector: 'app-address',
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
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  @ViewChild(MatSort) sort: MatSort | any;
  public address: MatTableDataSource<Address> = new MatTableDataSource<Address>();
  public selectedRowIndex: string = "-1";
  public displayedColumns: string[] = ["id", "strasse", "hausnummer", "postleitzahl", "ort", "land"]

  constructor(private addressService: AddressService, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.getAddresses();
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public getAddresses(): void {
    this.addressService.get().subscribe(result => {
      this.address = new MatTableDataSource(result);
      this.address.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.address.sort = this.sort;
    });
  }

  public openNewAddressDialog(): void {
    const dialogRef: MatDialogRef<AddressNewComponent> = this.dialog.open(AddressNewComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAddresses();
    });
  }

  public openEditAddressDialog(): void {
    const dialogRef: MatDialogRef<AddressEditComponent> = this.dialog.open(AddressEditComponent, {
      width: "500px",
      data: {adresse: this.getSelectedAddress()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAddresses();
    });
  }

  public openDeleteAddressDialog(): void {
    const dialogRef: MatDialogRef<AddressDeleteComponent> = this.dialog.open(AddressDeleteComponent, {
      width: "500px",
      data: {adresse: this.getSelectedAddress()}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAddresses();
    });
  }

  private getSelectedAddress(): any {
    return {...this.address.data.find(x => x.id == this.selectedRowIndex)};
  }
}
