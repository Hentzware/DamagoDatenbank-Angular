import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {Address} from "../../../core/entities/Address";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddressService} from "../../../core/services/address.service";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-address-delete',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './address-delete.component.html',
  styleUrl: './address-delete.component.css'
})
export class AddressDeleteComponent {
  public address: Address = {id:"",street:"",house_number:"",postal_code:"",location:"",country:""}

  constructor(private dialogRef: MatDialogRef<AddressDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private adressService: AddressService) {
    this.address = data.adresse;
  }

  public deleteAdress(): void {
    this.adressService.delete(this.data.adresse.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
